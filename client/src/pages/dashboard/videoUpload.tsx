import { Input, Loading } from "@/components/customComponents";
import { Button } from "@/components/ui/button";
import { apiHandler } from "@/lib/apiHandler";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type paramT = {
  [key: string]: any;
};

const resizeOptions = [
  "Scale",
  "Fit",
  "Limit Fit",
  "Fill",
  "Crop",
  "Pad",
  "Limit Pad",
];

const adjustData = [
  {
    key: "saturation",
    description: "Range between -100 to 100",
    min: -100,
    max: 100,
  },
  {
    key: "contrast",
    description: "Range between -100 to 100",
    min: -100,
    max: 100,
  },
  {
    key: "brightness",
    description: "Range between -99 to 100",
    min: -99,
    max: 100,
  },
  {
    key: "gamma",
    description: "Range between -50 to 150",
    min: -50,
    max: 150,
  },
];

const filterData = [
  {
    key: "blur",
    description: "Range b/w 1 to 2000.",
    min: 1,
    max: 2000,
  },
  {
    key: "vignette",
    description: "Range b/w 0 to 100.",
    min: 0,
    max: 100,
  },
  {
    key: "noise",
    description: "Range b/w 0 to 100.",
    min: 0,
    max: 100,
  },
  {
    key: "fade in",
    description: "The duration of the fade effect in milliseconds.",
    min: 0,
    max: 100000000000,
  },
  {
    key: "fade out",
    description: "The duration of the fade effect in milliseconds.",
    min: 0,
    max: 100000000000,
  },
];

const trimData = [
  {
    label: "Start",
    name: "startOffset",
    description: "Second from where video starts",
  },
  {
    label: "End",
    name: "endOffset",
    description: "Second from where video ends",
  },
];

function VideoUpload() {
  const [uploadedVideoData, setUploadedVideData] = useState({
    localUpload: {
      title: "VideoTest",
      description: "Ttest Description For video",
      type: "video",
      fileURL:
        "https://res.cloudinary.com/nzm/video/upload/v1750439473/reimage/rozvm61df18km3roiid6.mp4",
      _id: "685596263677e7896ce3c123",
      createdAt: "2025-06-20T17:11:02.111Z",
      updatedAt: "2025-06-20T17:11:02.111Z",
      __v: 0,
    },
    cloudinaryUpload: {
      asset_id: "7bc8e5d421a2c1d539f4ca1f6722fbb7",
      public_id: "reimage/rozvm61df18km3roiid6",
      version: 1750439473,
      version_id: "999cdca2886dbc4265d2fe5fe22c6a38",
      signature: "bb990cb7d5a1daf723f7b28709d426f17638dbd0",
      width: 478,
      height: 850,
      format: "mp4",
      resource_type: "video",
      created_at: "2025-06-20T17:11:13Z",
      tags: [],
      pages: 0,
      bytes: 240852,
      type: "upload",
      etag: "992ba0ea9d7a19538e9101025596fb13",
      placeholder: false,
      url: "http://res.cloudinary.com/nzm/video/upload/v1750439473/reimage/rozvm61df18km3roiid6.mp4",
      secure_url:
        "https://res.cloudinary.com/nzm/video/upload/v1750439473/reimage/rozvm61df18km3roiid6.mp4",
      playback_url:
        "https://res.cloudinary.com/nzm/video/upload/sp_auto/v1750439473/reimage/rozvm61df18km3roiid6.m3u8",
      folder: "reimage",
      audio: {
        codec: "aac",
        bit_rate: "128018",
        frequency: 48000,
        channels: 1,
        channel_layout: "mono",
      },
      video: {
        pix_format: "yuv420p",
        codec: "h264",
        level: 30,
        profile: "High",
        bit_rate: "983526",
        time_base: "1/90000",
      },
      is_audio: false,
      frame_rate: 29.605263157894736,
      bit_rate: 1118507,
      duration: 1.722667,
      rotation: 0,
      original_filename: "file",
      nb_frames: 51,
      api_key: "743384798964899",
    },
  });
  const [modifiedVideoData, setModifiedVideData] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);
  const {
    register: videoUploadRegister,
    handleSubmit: videoUploadHandleSubmit,
    formState: { errors: videoUploadErrors },
  } = useForm();

  const {
    control: videoTransformControl,
    register: modificationRegister,
    handleSubmit: modificationHandleSubmit,
    formState: { errors: modificationErrors },
    setValue: modificationSetValue,
    watch: modificationWatch,
  } = useForm({
    defaultValues: {
      height: null,
      width: null,
      resize: "",
      backGround: null,

      rotate: null,
      flip: "",

      startOffset: null,
      endOffset: null,
      borderColor: "#000000",
      borderRadius: null,
      borderSize: null,

      boomerang: null,
      saturation: null,
      contrast: null,
      brightness: null,
      gamma: null,
      blur: null,
      vignette: null,
      noise: null,
      fadeIn: null,
      fadeOut: null,

      speed: null,
      reverse: null,
    },
  });

  const uploadVideo = async (data: paramT) => {
    const formData = new FormData();
    formData.append("video", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);

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
    setUploadedVideData(res.res.data.data);
    setLoading(false);
  };

  const modifyVideo = async (data: paramT) => {
    data.publicId = uploadedVideoData.cloudinaryUpload.public_id;
    console.log(data);
    setLoading(true);
    const res = await apiHandler("/modify/video-transformation", "post", {
      data,
    });
    if (!res.success) {
      setLoading(false);
      toast.error(res.message);
      return;
    }
    setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setModifiedVideData((res as any).res.data.data);
    toast("Successfully modified");
  };

  useEffect(() => {
    if (!modificationWatch("rotate") || modificationWatch("flip") == "") return;
    toast.warning("It will over-ride the rotate value", {
      description: "want to clear the flip",
      action: {
        label: "clear",
        onClick: () => modificationSetValue("flip", ""),
      },
    });
  }, [modificationWatch("flip")]);

  useEffect(() => {
    if (modificationWatch("rotate"))
      if (modificationWatch("flip")) modificationSetValue("flip", "");
  }, [modificationWatch("rotate")]);

  return (
    <div className="my-4">
      <img
        src="../src/assets/grad2.jpg"
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.1] hidden dark:block  dark:grayscale z-[-9]"
      />
      {loading && <Loading />}
      <div className="mb-8 border p-4 rounded-md w-1/2 mx-auto">
        <form
          onSubmit={videoUploadHandleSubmit(uploadVideo)}
          className="flex flex-col gap-4"
        >
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
      <div>
        {uploadedVideoData && (
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 justify-center">
              <div className="border w-full p-4 rounded-md">
                <h2 className="font-bold text-3xl text-center p-3">
                  Modifications
                </h2>
                <form
                  onSubmit={modificationHandleSubmit(modifyVideo)}
                  className="flex flex-col gap-2"
                >
                  {/* size */}
                  <div className="border rounded-md px-2 pb-2 mb-2">
                    <h2 className="font-bold text-lg">Size</h2>
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-1/2">
                        <Input
                          type="number"
                          label="Height (px)"
                          placeHolder="00"
                          {...modificationRegister("height")}
                        />
                      </div>
                      <div className="w-1/2">
                        <Input
                          type="number"
                          label="Width (px)"
                          placeHolder="00"
                          {...modificationRegister("width")}
                        />
                      </div>
                    </div>
                    <Controller
                      name="resize"
                      control={videoTransformControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Resizing Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Resizing</SelectLabel>
                              {resizeOptions.map((x, index) => {
                                return (
                                  <SelectItem key={index} value={x}>
                                    {x}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* background */}
                  {(modificationWatch("resize") == "Pad" ||
                    modificationWatch("resize") == "Limit Pad") && (
                    <div className="mb-2">
                      <Input
                        label="Background"
                        type="color"
                        {...modificationRegister("backGround")}
                      />
                    </div>
                  )}

                  {/* Rotation */}
                  <div className="border rounded-md px-2 pb-2 mb-2">
                    <h2 className="font-bold text-lg">Rotate and Flip</h2>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-1/2">
                        <Input
                          type="number"
                          step={0.1}
                          label="rotation (deg)"
                          placeHolder="00"
                          {...modificationRegister("rotate")}
                        />
                      </div>
                      <div className="w-1/2 pb-1">
                        <label htmlFor="">Flip</label>
                        <Controller
                          name="flip"
                          control={videoTransformControl}
                          defaultValue=""
                          render={({ field }) => (
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full ">
                                <SelectValue placeholder="Flip" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Flip</SelectLabel>
                                  <SelectItem value="hflip">
                                    Horizontal
                                  </SelectItem>
                                  <SelectItem value="vflip">
                                    Vertical
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Border */}
                  <div className="gap-2 border rounded-md px-2 mb-2">
                    <h2 className="font-bold text-lg">Border</h2>
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-1/2">
                        <Input
                          type="number"
                          step={1}
                          label="Border Size (px)"
                          {...modificationRegister("borderSize")}
                        />
                      </div>
                      <div className="w-1/2">
                        <Input
                          type="color"
                          className="w-1/2 min-w-28 min-h-9 py-[0.55rem]"
                          label="Border Colour"
                          {...modificationRegister("borderColor")}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        label="Border Radius"
                        placeHolder="00"
                        min={0}
                        {...modificationRegister("borderRadius")}
                      />
                      <div className="absolute right-2 top-8">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info size={18} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Apply the same rounding to all corners. Specify a
                              radius in pixels as a positive integer.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  {/* Trim */}
                  <div className="border rounded-md px-2 mb-2">
                    <h2 className="font-bold text-lg">Trim</h2>
                    <div className="flex items-center justify-between gap-2">
                      {trimData.map((x, index) => {
                        return (
                          <div className="relative w-full" key={index}>
                            <Input
                              type="number"
                              step={0.1}
                              label={x.label}
                              {...modificationRegister(
                                x.name as "startOffset" | "endOffset"
                              )}
                            />

                            <div className="absolute right-2 top-1/2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info size={18} />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{x.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex w-full gap-2">
                    {/* Adjust */}
                    <div className="border w-1/2 rounded-md px-2 mp-2">
                      <h2 className="font-bold text-lg text-center">Adjust</h2>
                      {adjustData.map((x, index) => {
                        return (
                          <div
                            className="flex items-center justify-between gap-2"
                            key={index}
                          >
                            <p className="w-1/4">
                              {x.key.charAt(0).toUpperCase() + x.key.slice(1)}
                            </p>
                            <div className="relative flex justify-center items-center gap-2 w-3/4">
                              <div className="w-full">
                                <Input
                                  type="number"
                                  step={0.1}
                                  min={x.min}
                                  max={x.max}
                                  placeHolder="00"
                                  {...modificationRegister(
                                    x.key as
                                      | "saturation"
                                      | "contrast"
                                      | "brightness"
                                      | "gamma"
                                  )}
                                />
                              </div>
                              <div className="absolute right-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info size={18} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{x.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Effect*/}
                    <div className="border w-1/2 rounded-md px-2 mp-2">
                      <h2 className="font-bold text-lg text-center">Effect</h2>
                      {filterData.map((x, index) => {
                        return (
                          <div
                            className="flex items-center justify-between gap-2"
                            key={index}
                          >
                            <p className="w-1/4">
                              {x.key.charAt(0).toUpperCase() + x.key.slice(1)}
                            </p>
                            <div className="relative flex justify-center items-center gap-2 w-3/4">
                              <div className="w-full">
                                <Input
                                  type="number"
                                  step={0.1}
                                  min={x.min}
                                  max={x.max}
                                  placeHolder="00"
                                  {...modificationRegister(
                                    x.key as
                                      | "blur"
                                      | "vignette"
                                      | "noise"
                                      | "fadeIn"
                                      | "fadeOut"
                                  )}
                                />
                              </div>
                              <div className="absolute right-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info size={18} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{x.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border w-full mx-auto rounded-md p-2 mp-2">
                    {/* <h2 className="font-bold text-lg text-center">Effect</h2> */}
                    <div className="flex items-center justify-between gap-2">
                      <p className="w-1/4">Speed</p>
                      <div className="relative flex justify-center items-center gap-2 w-3/4">
                        <div className="w-full">
                          <Input
                            type="number"
                            step={0.1}
                            min={0}
                            max={100}
                            placeHolder="00"
                            {...modificationRegister("speed")}
                          />
                        </div>
                        <div className="absolute right-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={18} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>range between -50 to 100</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <label className=" w-1/2">
                        <input
                          type="checkbox"
                          className="h-[1px] opacity-0 overflow-hidden absolute whitespace-nowrap w-[1px] peer"
                          {...modificationRegister("reverse")}
                        />
                        <span className="peer-checked:shadow-blue-400/10 peer-checked:text-violet-400  peer-checked:before:bg-violet-600 peer-checked:before:opacity-100 peer-checked:before:scale-100 peer-checked:before:content-['✓'] flex flex-col items-center justify-center w-full min-h-[2rem] rounded-md shadow-lg transition-all duration-200 cursor-pointer relative border-gray-700 border-[1px] before:absolute before:w-5 before:h-5 before:border-[1px] before:rounded-full before:top-[6px]  before:left-1 before:opacity-0 before:transition-transform before:scale-0 before:text-gray-900 before:text-xs before:flex before:items-center before:justify-center hover:border-violet-700 hover:before:scale-100 hover:before:opacity-100">
                          <span className="transition-all duration-100"></span>
                          <span className="transition-all duration-300 text-center">
                            Reverse
                          </span>
                        </span>
                      </label>
                      <label className=" w-1/2">
                        <input
                          type="checkbox"
                          className="h-[1px] opacity-0 overflow-hidden absolute whitespace-nowrap w-[1px] peer"
                          {...modificationRegister("boomerang")}
                        />
                        <span className="peer-checked:shadow-blue-400/10 peer-checked:text-violet-400  peer-checked:before:bg-violet-600 peer-checked:before:opacity-100 peer-checked:before:scale-100 peer-checked:before:content-['✓'] flex flex-col items-center justify-center w-full min-h-[2rem] rounded-md shadow-lg transition-all duration-200 cursor-pointer relative border-gray-700 border-[1px] before:absolute before:w-5 before:h-5 before:border-[1px] before:rounded-full before:top-[6px]  before:left-1 before:opacity-0 before:transition-transform before:scale-0 before:text-gray-900 before:text-xs before:flex before:items-center before:justify-center hover:border-violet-700 hover:before:scale-100 hover:before:opacity-100">
                          <span className="transition-all duration-100"></span>
                          <span className="transition-all duration-300 text-center">
                            Boomarang
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <Button>Apply</Button>
                </form>
              </div>
              {/* <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold text-center">Original Video</h2>
              <video
                width="250"
                height="80"
                controls
                src={uploadedVideoData.cloudinaryUpload.secure_url}
                />
                </div> */}
            </div>
            <div className="p-4 size-96 flex justify-center items-start">
              {modifiedVideoData && (
                <video
                  src={modifiedVideoData}
                  controls
                  style={{
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
            {/* <video width="510" height="120" src={modifiedVideoData} controls  style={{ width: "510px", height: "120px", objectFit: "cover" }} /> */}
            {/* https://res.cloudinary.com/nzm/video/upload/h_400/e_boomerang/v1/reimage/rozvm61df18km3roiid6?_a=BAMClqWO0 */}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoUpload;
