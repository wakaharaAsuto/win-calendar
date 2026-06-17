import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, point: number) => void;
};

export const OtherActionModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [point, setPoint] = useState<number | "">("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-80 p-4 space-y-4">
        <h2 className="text-lg font-bold text-center">その他行動</h2>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="行動名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          placeholder="ポイント（±可）"
          value={point}
          onChange={(e) =>
            setPoint(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <div className="flex gap-2">
          <button
            className="flex-1 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className="flex-1 py-2 bg-blue-500 text-white rounded"
            disabled={!name || point === ""}
            onClick={() => onSubmit(name, Number(point))}
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
};
