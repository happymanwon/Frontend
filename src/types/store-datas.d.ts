declare module "store-datas" {
  export interface StoreData {
    sh_id: string;
    sh_way: string; //찾아오시는길
    sh_photo: string;
    sh_info: string;
    sh_phone: string;
    sh_name: string;
    base_ym: string; //기준연월 yy-mm
    induty_code_se: string; //분류코드
    induty_code_se_name: string; //분류코드명
    sh_rcmn: number; //추천수
    sh_pride: string; //자랑거리
    sh_addr: string;
  }
}
