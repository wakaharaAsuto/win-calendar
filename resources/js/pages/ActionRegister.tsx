import { useMemo, useState } from "react";
import { OtherActionModal } from "./OtherActionModal";

type ActionItem = {
  id: number;
  name: string;
  point: number;
  isOther?: boolean;
};

type Log = {
  actionItemId: number;
  name: string;
  point: number;
  createdAt: string;
};

const ACTION_ITEMS: ActionItem[] = [
  { id: 1, name: "筋トレ", point: 2 },
  { id: 2, name: "読書", point: 1 },
  { id: 3, name: "勉強", point: 2 },
  { id: 4, name: "たばこ", point: -2 },
  { id: 5, name: "夜更かし", point:-1 },
  { id: 6, name: "早起き", point: 1 },
  { id: 7, name: "プラスなし", point: -1 },
];

export const ActionRegister = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [otherName, setOtherName] = useState("");
  const [otherPoint, setOtherPoint] = useState<number | "">("");

  /* ===== 追加 ===== */
  const addLog = (item: ActionItem) => {
    setLogs((prev) => [
      {
        actionItemId: item.id,
        name: item.name,
        point: item.point,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  /* ===== 減算 ===== */
  const removeLog = (actionItemId: number) => {
    setLogs((prev) => {
      const index = prev.findIndex((l) => l.actionItemId === actionItemId);
      if (index === -1) return prev;
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  /* ===== その他 ===== */
	const addOther = (name: string, point: number) => {
	addLog({
			id: Date.now(),
			name,
			point,
			isOther: true,
	});
	};

  /* ===== 集約 ===== */
  const grouped = useMemo(() => {
    const map = new Map<
      number,
      { name: string; count: number; lastAt: string; point: number }
    >();

    logs.forEach((l) => {
      const key = l.actionItemId;
      const existing = map.get(key);
      if (existing) {
        existing.count++;
        existing.lastAt = l.createdAt;
      } else {
        map.set(key, {
          name: l.name,
          count: 1,
          lastAt: l.createdAt,
          point: l.point,
        });
      }
    });

    return Array.from(map.entries()).sort(
      (a, b) => b[1].lastAt.localeCompare(a[1].lastAt)
    );
  }, [logs]);

  /* ===== 合計 ===== */
  const totalPoint = useMemo(
    () => logs.reduce((sum, l) => sum + l.point, 0),
    [logs]
  );

  const status =
    totalPoint > 0 ? "勝ち日" : totalPoint === 0 ? "引き分け" : "負け日";

  const today = new Date().toLocaleDateString("ja-JP");

  return (
    <div className="flex flex-col h-full">
      {/* 上部情報 */}
      <div className="px-4 py-3 border-b">
        <div className="text-sm text-gray-500">{today}</div>
        <div className="text-lg font-bold">{status}</div>
        <div className="text-2xl font-bold">{totalPoint} pt</div>
      </div>

      {/* 履歴 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {grouped.map(([id, g]) => (
          <div
            key={id}
            className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded"
          >
            <div>{g.name}</div>
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 bg-gray-300 rounded"
                onClick={() => removeLog(id)}
              >
                −
              </button>
              <span className="font-bold">{g.count}</span>
              <button
                className="w-8 h-8 bg-blue-500 text-white rounded"
                onClick={() =>
                  addLog({
                    id,
                    name: g.name,
                    point: g.point,
                	})
                }
              >
                ＋
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 行動登録 */}
      <div className="border-t px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {ACTION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => addLog(item)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full shrink-0"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => setIsOtherOpen(true)}
            className="px-4 py-2 bg-gray-500 text-white rounded-full shrink-0"
          >
            ＋ その他
          </button>
        </div>
      </div>
      {/* その他モーダル */}
      <OtherActionModal
        isOpen={isOtherOpen}
        onClose={() => setIsOtherOpen(false)}
        onSubmit={(name, point) => {
            addOther(name, point);
            setIsOtherOpen(false);
        }}
        />
    </div>
  );
};
