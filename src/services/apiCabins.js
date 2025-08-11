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

async function uploadCabinImage(image) {
  if (!(image instanceof File)) return null;
  const uniquePrefix = crypto.randomUUID();
  const originalName = image.name;
  const uniqueFileName = `${uniquePrefix}-${originalName}`;

  const { error: uploadError } = await supabase.storage
    .from('cabin-images')
    .upload(uniqueFileName, image, {
      cacheControl: '3600',
      upsert: true,
      contentType: image.type,
    });

  if (uploadError) throw new Error('File upload failed');
  return `${UPLOAD_URL}${uniqueFileName}`;
}

export async function createCabin(newCabin) {
  let cabinData = { ...newCabin };

  // 画像必須チェック
  if (
    !(
      newCabin.image instanceof File ||
      (typeof newCabin.image === 'string' && newCabin.image.startsWith('http'))
    )
  ) {
    throw new Error('Please select an image file');
  }
  // 画像アップロード or 既存URLをそのまま利用
  if (newCabin.image instanceof File) {
    cabinData.image = await uploadCabinImage(newCabin.image);
  } else {
    // 既存の画像URLをそのまま使う
    cabinData.image = newCabin.image;
  }

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

  // 画像がFile型ならアップロードしてURLを更新
  if (updatedCabin.image instanceof File) {
    cabinData.image = await uploadCabinImage(updatedCabin.image);
  }
  // 画像がFileでなければ既存URLをそのまま使う

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
