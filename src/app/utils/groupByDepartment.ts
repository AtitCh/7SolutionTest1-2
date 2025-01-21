import { IGroupedData, ISummary, IUser } from "../type/user";

const getAgeRange = (age: number): string => {
  if (age < 18) return "0-17";
  if (age >= 18 && age < 30) return "18-29";
  if (age >= 30 && age < 40) return "30-39";
  if (age >= 40 && age < 50) return "40-49";
  return "50+";
};
//
const groupByDepartment = (users: IUser[]) => {
  console.log("users: ", users);
  return users.reduce((acc, user) => {
    // Initialize department if not present

    if (!acc[user.company.department]) {
      acc[user.company.department] = {
        male: 0,
        female: 0,
        ageRange: getAgeRange(user.age),
        hair: { Black: 0, Blond: 0, Chestnut: 0, Brown: 0 },
        addressUser: {},
      };
    }

    // Count male/female
    if (user.gender === "male") {
      acc[user.company.department].male += 1;
    } else {
      acc[user.company.department].female += 1;
    }

    const hairColor = String(user.hair.color); // Ensure it's treated as a string
    console.log(`Hair color: ${hairColor}`); // Debugging: Log hair color
    if (acc[user.company.department].hair[hairColor] !== undefined) {
      acc[user.company.department].hair[hairColor] += 1;
    } else {
      // Create new hair color if not found
      acc[user.company.department].hair[hairColor] = 1;
    }

    // Add address
    const userFullName = `${user.firstName}${user.lastName}`;
    acc[user.company.department].addressUser[userFullName] =
      user.address.postalCode;

    return acc;
  }, {} as Record<string, ISummary>);
};

//
export default groupByDepartment;
