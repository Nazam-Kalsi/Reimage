import { Input } from "@/components/customComponents";
import { Button } from "@/components/ui/button";
import React, { useRef, useEffect, useState } from "react";

function SignIt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#fff");
  const [penWidth, setPenWidth] = useState(2);
  const [paths, setPaths] = useState<Array<Array<{ x: number; y: number }>>>([]);
  const currentPath = useRef<Array<{ x: number; y: number }>>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctxRef.current = ctx;
  }, []);

const startDrawing = (e: React.MouseEvent) => {
  const canvas = canvasRef.current;
  if (!ctxRef.current || !canvas) return;
  setIsDrawing(true);
  currentPath.current = [];
  const point = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  currentPath.current.push(point);
  ctxRef.current.beginPath();
  ctxRef.current.moveTo(point.x, point.y);
};

const draw = (e: React.MouseEvent) => {
  if (!isDrawing || !ctxRef.current) return;
  const point = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  currentPath.current.push(point);
  ctxRef.current.strokeStyle = penColor;
  ctxRef.current.lineWidth = penWidth;
  ctxRef.current.lineTo(point.x, point.y);
  ctxRef.current.stroke();
};

const stopDrawing = () => {
  if (!isDrawing) return;
  setIsDrawing(false);
  ctxRef.current?.closePath();
  setPaths((prev) => [...prev, currentPath.current]);
};

const clearCanvas = () => {
  const canvas = canvasRef.current;
  if (!ctxRef.current || !canvas) return;
  ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
};

const saveCanvas = (type: "png" | "jpg") => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;
  const exportCtx = exportCanvas.getContext("2d");
  if (!exportCtx) return;

  if (type === "jpg") {
    exportCtx.fillStyle = bgColor;
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  }
  exportCtx.drawImage(canvas, 0, 0);
  const dataURL = exportCanvas.toDataURL(`image/${type}`);
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `signature.${type}`;
  link.click();
};

const undoLast = () => {
  const canvas = canvasRef.current;
  const ctx = ctxRef.current;
  if (!canvas || !ctx) return;

  const updatedPaths = [...paths];
  updatedPaths.pop();
  setPaths(updatedPaths);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatedPaths.forEach((path) => {
    if (path.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.stroke();
    ctx.closePath();
  });
};


  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="border p-4 rounded-md space-y-2">
        <h2 className="text-center font-semibold text-2xl">Sign It</h2>
        <div
          className="relative rounded-md"
          style={{ backgroundColor: bgColor }}
        >
          <canvas
            ref={canvasRef}
            className="border w-[65vw] h-[60vh] rounded-md"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          ></canvas>
          <Button className="absolute bottom-2 right-2" onClick={clearCanvas}>Clear</Button>
          <Button className="absolute bottom-2 right-20" onClick={undoLast}>Undo</Button>
        </div>
        <div className="flex border justify-around rounded-md p-2">
          <div className="p-2 rounded-md bg-white/5">
            <p className="font-medium">Modifications</p>
            <div className="flex gap-2">
              <Input
                label="Pen Color"
                type="color"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
              />
              <Input
                label="BG Color"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
              <Input
                label="Width"
                type="number"
                step={0.1}
                value={penWidth}
                onChange={(e) => setPenWidth(parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="p-2 rounded-md bg-white/5">
            <p className="font-medium">Save as</p>
            <div className="flex gap-2">
              <Button variant='outline' onClick={() => saveCanvas("png")}>PNG</Button>
              <Button variant='outline' onClick={() => saveCanvas("jpg")}>JPG</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIt;
