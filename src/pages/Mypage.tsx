import { useSearchParams } from "react-router-dom";
import {
  MypageMain,
  MypagePay,
  MypageZzan,
  MypageCommunity,
  MypageSetting,
  MypageProfile,
  MypageCharge,
  MypagePayment,
} from "@/components/mypage";

const Mypage = () => {
  const [page] = useSearchParams();
  const pageName = page.get("page");

  if (pageName === "pay") {
    return <MypagePay />;
  } else if (pageName === "zzan") {
    return <MypageZzan />;
  } else if (pageName === "community") {
    return <MypageCommunity />;
  } else if (pageName === "setting") {
    return <MypageSetting />;
  } else if (pageName === "profile") {
    return <MypageProfile />;
  } else if (pageName === "charge") {
    return <MypageCharge />;
  } else if (pageName === "payment") {
    return <MypagePayment />;
  }

  return <MypageMain />;
};

export default Mypage;
