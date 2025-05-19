import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type selectorProps = {
  // data:{[key:string]:string},
  data: any;
  onChange: (value: string) => void;
  value: string;
  placeHolder?: string;
};

type Tformat = {
  size: string;
  aspectRatio: string;
  formats: string[];
};
type Tdata = {
  [platform: string]: {
    [formatType: string]: Tformat;
  };
};

export const Selector = ({
  data,
  onChange,
  value,
  placeHolder = "select",
}: selectorProps) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {(Object.entries(data) as [string, { [type: string]: Tformat }][]).map(
          ([platform, formats], index: number) => {
            return (
              <div key={index}>
                <SelectGroup>
                  <SelectLabel>{platform}</SelectLabel>
                  {Object.entries(formats).map(
                    ([type, format]: [string, Tformat], index: number) => {
                      return (
                        <SelectItem key={index} value={`${platform}-${type}-${format.size}`}>
                         {platform}: {type} - {format.size}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectGroup>
                <SelectSeparator />
              </div>
            );
          }
        )}
      </SelectContent>
    </Select>
  );
};
