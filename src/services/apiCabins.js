import supabase from './supabase';

const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL;

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not get loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}

export async function createCabin(newCabin) {
  let cabinData = { ...newCabin };

  // If image is required, throw error if not a File
  if (!(newCabin.image instanceof File)) {
    throw new Error('Please select an image file');
  }

  // 画像ファイルがFile型ならSupabase Storage SDKでアップロード
  const uniquePrefix = crypto.randomUUID();
  const originalName = newCabin.image.name;
  const uniqueFileName = `${uniquePrefix}-${originalName}`;

  const { error: uploadError } = await supabase.storage
    .from('cabin-images')
    .upload(uniqueFileName, newCabin.image, {
      cacheControl: '3600',
      upsert: true,
      contentType: newCabin.image.type,
    });

  if (uploadError) throw new Error('File upload failed');
  // 公開URLを組み立てて格納
  cabinData.image = `${UPLOAD_URL}${uniqueFileName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert([cabinData])
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }
  return data;
}

export async function updateCabin(id, updatedCabin) {
  let cabinData = { ...updatedCabin };

  // If image is a File, upload it and update the image URL
  if (updatedCabin.image instanceof File) {
    const uniquePrefix = crypto.randomUUID();
    const originalName = updatedCabin.image.name;
    const uniqueFileName = `${uniquePrefix}-${originalName}`;

    const { error: uploadError } = await supabase.storage
      .from('cabin-images')
      .upload(uniqueFileName, updatedCabin.image, {
        cacheControl: '3600',
        upsert: true,
        contentType: updatedCabin.image.type,
      });

    if (uploadError) throw new Error('File upload failed');
    // Set the new image URL
    cabinData.image = `${UPLOAD_URL}${uniqueFileName}`;
  }
  // If image is not a File, keep the existing image URL (do nothing)

  const { data, error } = await supabase
    .from('cabins')
    .update(cabinData)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be updated');
  }
  return data;
}
