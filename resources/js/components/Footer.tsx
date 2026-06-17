import { Link } from "@tanstack/react-router";

export const Footer = () => {
  return (
    <footer className="border-t px-4 py-2 flex justify-around text-sm">
      <Link to="/app/actions">行動登録</Link>
      <Link to="/app/calendar">カレンダー</Link>
      <Link to="/app/items">項目管理</Link>
    </footer>
  );
};
