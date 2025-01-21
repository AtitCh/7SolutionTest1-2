import { IItem } from "../type/item";

interface ButtonListProps {
  items: IItem[];
  handleItem: (item: IItem) => void;
}

export default function ButtonList({ items, handleItem }: ButtonListProps) {
  return (
    <div
      className="text-white flex flex-col space-y-2 items-center justify-start w-full px-2"
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((v: IItem, i: number) => (
        <button
          className="box-white text-black hover flex items-center justify-center px-6 py-3 rounded-sm w-full shadow-sm"
          onClick={() => {
            handleItem(v);
          }}
          key={i}
        >
          {v.name}
        </button>
      ))}
    </div>
  );
}
