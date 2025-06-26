import { Loading } from "@/components/customComponents";
import { apiHandler } from "@/lib/apiHandler";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { set } from "zod";

import { useAppSelector } from '@/store/store';
import { download } from "@/lib/download";

type Props = {};

type imagesDataT = {
  [key: string]: string;
};

function ViewAll({}: Props) {
  const [data, setData] = useState<imagesDataT[] | null>(null);
  const [dataLength, setDataLength] = useState<number>(0); //for pagination
  const [dataType, setDataType] = useState<"image" | "video">("image");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const user = useAppSelector((state) => state.userSlice.user);
  console.log('user :',user);
  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await apiHandler(
        `/dashboard/get-images-data?type=${dataType}&page=${page}&limit=9`,
        "get"
      );

      if (res && !res.success) {
        toast.error(res.message);
        setLoading(false);
        return;
      }
      setData(res?.res?.data.data);
      setDataLength((res?.res?.data).length);
      setLoading(false);
    })();
  }, [page, dataType]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <img
        src="./src/assets/frame2.png"
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale z-[-9] hidden dark:block"
      />
      {loading && <Loading />}
      <div className="flex mt-3 mr-8 space-x-3 select-none">
        {["image", "video"].map((x, index) => {
          return (
            <label key={index} className="flex items-center justify-center flex-grow cursor-pointer radio">
              <input
                className="hidden peer"
                type="radio"
                value={x}
                checked={dataType === x}
                onChange={() => {
                  setDataType(x as "image" | "video");
                  setPage(1);
                }}
              />
              <span className="mb-2 relative text-md text-shadow-sm transition-all duration-300 after:opacity-0 peer-checked:after:opacity-100 peer-checked:text-purple-500 peer-checked:after:content-[''] peer-checked:after:block peer-checked:after:w-1/2 peer-checked:after:h-0.5 peer-checked:after:bg-purple-400 peer-checked:after:rounded-md peer-checked:after:absolute peer-checked:after:right-0 peer-checked:after:-bottom-1 peer-checked:before:content-[''] peer-checked:before:block peer-checked:before:w-full peer-checked:before:h-0.5 peer-checked:before:bg-purple-500 before:opacity-0 peer-checked:before:opacity-100 peer-checked:before:transition-all peer-checked:before:duration-300 peer-checked:before:rounded-md peer-checked:before:absolute peer-checked:before:right-0 peer-checked:before:bottom-0">
                {x.toUpperCase()}
              </span>
            </label>
          );
        })}
      </div>

      <div className="flex items-start min-h-[85vh] w-full">
        {data &&
          data.map((x, index) => {
            return (
              <div
                key={index}
                className="basis[30%] flex flex-col min-h-64 gap-2 justify-start m-2 p-2 border rounded-lg"
              >
                {dataType == "image" ? (
                  <img
                    src={x.fileURL}
                    alt={`Image ${index + 1}`}
                    className="w-64 object-contain rounded-lg"
                  />
                ) : (
                  <video width="280" height="100" controls src={x.fileURL}/>
                )}
                <div className="flex w-full justify-between">
                  <div>
                    <p className="text-md text-gray-400 leading-none ">
                      {x.title}
                    </p>
                    <p className="text-sm text-gray-600">{x.description}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(x.createdAt).toDateString()}
                  </p>
                </div>
                <Button onClick={() => download(x.fileURL)}>Download</Button>
              </div>
            );
          })}
      </div>

      <Pagination className="">
        <PaginationContent>
          {page != 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => prev - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setPage((prev) => prev - 1)}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>
          {dataLength > 0 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setPage((prev) => prev + 1)}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ViewAll;
