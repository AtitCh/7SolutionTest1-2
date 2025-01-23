"use client";
import { IItem } from "./type/item";
import ButtonList from "./component/buttonlist";
import { useState } from "react";
import fetchData from "./utils/axios";
import groupByDepartment from "./utils/groupByDepartment";

//
const fruitBasket = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];
//

//
export default function Home() {
  //for test 1
  const [vegetable, setVegetable] = useState<IItem[]>([]);

  const [fruit, setFruit] = useState<IItem[]>([]);

  const [basket, setBasket] = useState<IItem[]>(fruitBasket);

  //
  const handlePushItem = async (v: IItem) => {
    handleBasket(v);

    if (v.type === "Vegetable") {
      setVegetable((prev) => [...prev, v]);

      handleAutoRemoveVeg(v);
    } else if (v.type === "Fruit") {
      setFruit((prev) => [...prev, v]);
      handleAutoRemoveFruit(v);
    }
  };
  const handleAutoRemoveVeg = (v: IItem) => {
    setTimeout(() => {
      setVegetable((prev) => prev.filter((i) => i.name !== v.name));
      setBasket((prev) => {
        const isDuplicate = prev.some((i) => i.name === v.name);

        if (isDuplicate) {
          return prev;
        } else {
          return [...prev, v];
        }
      });
    }, 5000);
  };
  const handleAutoRemoveFruit = (v: IItem) => {
    setTimeout(() => {
      setFruit((prev) => prev.filter((i) => i.name !== v.name));
      setBasket((prev) => {
        const isDuplicate = prev.some((i) => i.name === v.name);

        if (isDuplicate) {
          return prev;
        } else {
          return [...prev, v];
        }
      });
    }, 5000);
  };

  const handleBasket = (v: IItem) => {
    setBasket((prev) => prev.filter((i) => i.name !== v.name));
  };
  //
  const handleRemoveFruit = (v: IItem) => {
    setFruit((prev) => prev.filter((i) => i.name !== v.name));
    setBasket((prev) => [...prev, v]);
  };
  //
  const handleRemoveVegetable = (v: IItem) => {
    setVegetable((prev) => prev.filter((i) => i.name !== v.name));
    setBasket((prev) => [...prev, v]);
  };

  // comment ไว้ก่อน เผื่อใช้
  // const handleRemoveFirstFruit = () => {
  //   if (fruit.length === 0) {
  //     return;
  //   } else {
  //     let firstItem = fruit[0];

  //     setFruit((prev) => prev.slice(1));

  //     setBasket((prev) => [...prev, firstItem]);
  //   }
  // };
  // comment ไว้ก่อน เผื่อใช้
  // const handleRemoveFirstVeg = () => {
  //   if (vegetable.length === 0) {
  //     return;
  //   } else {
  //     let firstItem = vegetable[0];

  //     setVegetable((prev) => prev.slice(1));

  //     setBasket((prev) => [...prev, firstItem]);
  //   }
  // };
  //

  // for test 2
  const [grouped, setGrouped] = useState<any>({});
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleRowClick = (department: string) => {
    setExpandedRow(expandedRow === department ? null : department); // Toggle row
  };
  const processUserData = async () => {
    const users = await fetchData();
    const groupedData = groupByDepartment(users);

    setGrouped(groupedData);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="bg-white h-[85vh] w-[50vw] grid grid-cols-3 gap-4 bg-gray-100 p-4">
          <ButtonList items={basket} handleItem={handlePushItem} />
          <div
            className="grid grid-rows-[7%_93%]"
            // onClick={handleRemoveFirstFruit}
          >
            <div className="box-grey text-black flex items-center justify-center w-full">
              Fruit
            </div>
            <div className="box-white-2 text-white flex items-center justify-center w-full">
              <ButtonList items={fruit} handleItem={handleRemoveFruit} />
            </div>
          </div>
          <div
            className="grid grid-rows-[7%_93%]"
            // onClick={handleRemoveFirstVeg}
          >
            <div className="box-grey text-black flex items-center justify-center w-full">
              Vegetable
            </div>
            <div className="box-white-2 w-auto text-white flex items-center justify-center w-full">
              <ButtonList
                items={vegetable}
                handleItem={handleRemoveVegetable}
              />
            </div>
          </div>
        </div>
        <div className="bg-white h-[85vh] w-[50vw] grid grid-cols-[20%_80%] gap-0 bg-gray-100 p-4">
          <div className=" h-[20vh] w-[10vw] flex items-center justify-center">
            <button
              className="box-white text-black hover flex items-center justify-center px-6 py-3 rounded-sm shadow-sm"
              onClick={processUserData}
            >
              Get API
            </button>
          </div>

          <div className="h-full w-full overflow-auto">
            <table className="table-auto text-black w-full">
              <thead className="border-2">
                <tr>
                  <th className="border-2 text-center">Department</th>
                  <th className="border-2 text-center">Age-Range</th>
                  <th className="border-2 text-center">Female</th>
                  <th className="border-2 text-center">Male</th>
                </tr>
              </thead>
              <tbody className="border-2">
                {Object.entries(grouped).map(
                  ([department, data]: [string, any], i: number) => (
                    <tr key={i} onClick={() => handleRowClick(department)}>
                      <td className="border-2 text-center">{department}</td>
                      <td className="border-2 text-center">{data.ageRange}</td>
                      <td className="border-2 text-center">{data.female}</td>
                      <td className="border-2 text-center">{data.male}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="text-black mt-2">JSON area</div>
            <textarea
              value={JSON.stringify(grouped, null, 2)} // Converts JSON to a formatted string
              // onChange={(e) => setJsonData(JSON.parse(e.target.value))} // Optionally update the state with new JSON (if editable)
              className="w-full h-48 p-2 border border-gray-300 text-black mt-2"
              readOnly // If you want the JSON to be read-only in the text box
            />
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
