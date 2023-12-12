export interface Store {
  id: number;
  way: string; //찾아오시는길
  imageUrl: string;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  latitude: string;
  longitude: string;
  info: string;
  menuList: MenuList[];
  likeCount: number;
}

interface MenuList {
  menuName: string;
  menuPrice: number;
}
