import React from "react";
import { useSearchParams } from "react-router-dom";
import { MypageMain, MypagePay, MypageZzan, MypageCommunity, MypageSetting, MypageProfile } from "@/components/mypage";

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
  }

  return <MypageMain />;
};

export default Mypage;
