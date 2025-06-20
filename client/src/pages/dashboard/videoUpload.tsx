import { Input } from '@/components/customComponents';
import { Button } from '@/components/ui/button';
import { apiHandler } from '@/lib/apiHandler';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {}

function VideoUpload({}: Props) {
  const [videoData, setVideData]  =useState({
    "localUpload": {
        "title": "VideoTest",
        "description": "Ttest Description For video",
        "type": "video",
        "fileURL": "https://res.cloudinary.com/nzm/video/upload/v1750439473/reimage/rozvm61df18km3roiid6.mp4",
        "_id": "685596263677e7896ce3c123",
        "createdAt": "2025-06-20T17:11:02.111Z",
        "updatedAt": "2025-06-20T17:11:02.111Z",
        "__v": 0
    },
    "cloudinaryUpload": {
        "asset_id": "7bc8e5d421a2c1d539f4ca1f6722fbb7",
        "public_id": "reimage/rozvm61df18km3roiid6",
        "version": 1750439473,
        "version_id": "999cdca2886dbc4265d2fe5fe22c6a38",
        "signature": "bb990cb7d5a1daf723f7b28709d426f17638dbd0",
        "width": 478,
        "height": 850,
        "format": "mp4",
        "resource_type": "video",
        "created_at": "2025-06-20T17:11:13Z",
        "tags": [],
        "pages": 0,
        "bytes": 240852,
        "type": "upload",
        "etag": "992ba0ea9d7a19538e9101025596fb13",
        "placeholder": false,
        "url": "http://res.cloudinary.com/nzm/video/upload/v1750439473/reimage/rozvm61df18km3roiid6.mp4",
        "secure_url": "https://res.cloudinary.com/nzm/video/upload/v1750439473/reimage/rozvm61df18km3roiid6.mp4",
        "playback_url": "https://res.cloudinary.com/nzm/video/upload/sp_auto/v1750439473/reimage/rozvm61df18km3roiid6.m3u8",
        "folder": "reimage",
        "audio": {
            "codec": "aac",
            "bit_rate": "128018",
            "frequency": 48000,
            "channels": 1,
            "channel_layout": "mono"
        },
        "video": {
            "pix_format": "yuv420p",
            "codec": "h264",
            "level": 30,
            "profile": "High",
            "bit_rate": "983526",
            "time_base": "1/90000"
        },
        "is_audio": false,
        "frame_rate": 29.605263157894736,
        "bit_rate": 1118507,
        "duration": 1.722667,
        "rotation": 0,
        "original_filename": "file",
        "nb_frames": 51,
        "api_key": "743384798964899"
    }
});
  const [loading,setLoading]= useState<boolean>(false)
  const {
    register:videoUploadRegister,
    handleSubmit:videoUploadHandleSubmit,
    formState: { errors: videoUploadErrors },
    watch: videoUploadWatch,
  } = useForm();

  const uploadVideo = async (data:any)=>{
    const formData = new FormData();
    formData.append('video', data.file[0]);
    formData.append('title', data.title);
    formData.append('description', data.description);

    const res = await apiHandler("/upload/upload-video", "post", {
      data: formData,
    });
    if (!res.success) {
      setLoading(false);
      console.log(res.message);
      toast.error(res.message);
      return;
    }
    console.log(res);
    if (!res.res) return;
    setVideData(res.res.data.data);
    setLoading(false);    
  }


  return (
    <div className='mb-8 border p-4 rounded-md w-1/2 mx-auto'>
      <form onSubmit={videoUploadHandleSubmit(uploadVideo)} className='flex flex-col gap-4'>
        <h2 className="font-bold text-3xl text-center p-3">Upload Video</h2>
                    <Input
                      type="file"
                      accept="video/*"
                      label="Upload image"
                      error={videoUploadErrors.file?.message as string}
                      {...videoUploadRegister("file")}
                    />
                    <Input
                      label="Title"
                      error={videoUploadErrors.title?.message as string}
                      {...videoUploadRegister("title")}
                    />
                    <Input
                      label="Description"
                      error={videoUploadErrors.description?.message as string}
                      {...videoUploadRegister("description")}
                    />
                    <Button>Upload</Button>
        
      </form>
    </div>
  )
}

export default VideoUpload