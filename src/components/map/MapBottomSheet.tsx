import { useRef } from "react";
import { styled } from "styled-components";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import Container from "@/components/map/MapBottomSheet/Container";
import SheetContent from "@/components/map/MapBottomSheet/SheetContent";
import Card from "@/components/map/Card";
import { StoreDataType } from "@/types/map/storeDataType";
import "react-spring-bottom-sheet/dist/style.css";
import "./MapBottomSheet/customBottomSheet.css";

interface MapBottomSheetProps {
  storeData: StoreDataType[];
}

const MapBottomSheet: React.FC<MapBottomSheetProps> = ({ storeData }) => {
  const focusRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  // const handleResize = () => {
  //   const mainWidth = 425;
  //   const width = window.innerWidth;
  //   const newZoom = width < mainWidth ? width / mainWidth : 1;
  //   // setZoom(newZoom);
  // };

  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <Container>
      <BottomSheet
        open
        skipInitialTransition
        ref={sheetRef}
        blocking={false}
        initialFocusRef={focusRef}
        defaultSnap={({ maxHeight }) => maxHeight / 4}
        snapPoints={({ maxHeight }) => [maxHeight - 170, maxHeight / 4]}
        expandOnContentDrag={true}
      >
        <SheetContent>
          <CardContainer>
            <Card storeData={storeData} />
          </CardContainer>
        </SheetContent>
      </BottomSheet>
    </Container>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 375px) {
    zoom: 0.9;
  }

  @media (max-width: 320px) {
    zoom: 0.8;
  }
`;

export default MapBottomSheet;
