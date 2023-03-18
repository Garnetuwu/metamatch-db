import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useHeroRequests from "../hooks/useHeroRequests";
import BasicInfoDisplay from "../components/HeroDisplay/BasicInfoDisplay";
import RelationsDisplay from "../components/HeroDisplay/RelationsDisplay";
import BasicInfoUpdate from "../components/HeroDisplay/BasicInfoUpdate";
import RelationsUpdate from "../components/HeroDisplay/RelationsUpdate";
import RelationFilter from "../components/HeroDisplay/RelationFilter";
import Card from "../components/UI/Card";

const DetailedHero = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const param = useParams();
  const { fetchHeroData } = useHeroRequests(param.id, token);
  const { isLoading, isSuccess, data, isError, error, refetch } = fetchHeroData;
  const [isProfileEditingMode, setIsProfileEditingMode] = useState(false);
  const [isRelationsEditingMode, setIsRelationsEditingMode] = useState(false);
  const [role, setRole] = useState("support");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      refetch();
      dispatch({ type: "CLEAR_HERO" });
    }
  }, [pathname]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "UPDATE", payload: data.data });
    }
  }, [isSuccess, data]);

  return (
    <>
      {isLoading && <div> Loading </div>}
      {isError && <div>Something went wrong. {error.response} </div>}
      {isSuccess && (
        <Card className="flex flex-col px-10 xl:pr-10 xl:flex-row justify-center items-center border-2 border-sand">
          <div className="py-5 xl:w-[35vw] flex flex-col items-center gap-5 ">
            {!isProfileEditingMode && (
              <BasicInfoDisplay
                onEditProfile={() => {
                  setIsProfileEditingMode(true);
                }}
              />
            )}
            {isProfileEditingMode && (
              <BasicInfoUpdate
                heroData={data.data}
                onEditProfile={() => {
                  setIsProfileEditingMode(false);
                }}
              />
            )}
          </div>
          <div className="mt-5 xl:mt-0 xl:ml-5 w-[80vw] xl:w-[50vw]">
            <RelationFilter
              currentRole={role}
              onFilter={(role) => {
                setRole(role);
              }}
            />
            {!isRelationsEditingMode && (
              <RelationsDisplay
                currentRole={role}
                onEditRelations={() => {
                  setIsRelationsEditingMode(true);
                }}
              />
            )}
            {isRelationsEditingMode && (
              <RelationsUpdate
                heroData={data.data}
                onEditRelations={() => {
                  setIsRelationsEditingMode(false);
                }}
              />
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default DetailedHero;
