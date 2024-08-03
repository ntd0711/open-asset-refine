import LeftSide from "@components/auth/LeftSide";
import RightSide from "@components/auth/RightSide";

export default async function Register() {
  return (
    <div className="py-[34px] px-[20px] sm:p-0 sm:flex sm:h-[100%]">
      <LeftSide />
      <RightSide />
    </div>
  );
}
