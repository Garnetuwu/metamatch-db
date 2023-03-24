import { useDispatch } from "react-redux";
import HeroBasicInfo from "../HeroForm/HeroBasicInfo";
import useHeroRequests from "../../hooks/useHeroRequests";
import Button from "../UI/Button";
import { useEffect } from "react";

const BasicInfoUpdate = ({
  onEditProfile,
  heroData: heroOriginalData,
  refetch,
}) => {
  const { editHeroMutation } = useHeroRequests(heroOriginalData._id);
  const { isSuccess, isLoading, isError, error } = editHeroMutation;

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      onEditProfile();
      refetch();
    }
  }, [isSuccess]);

  const cancelFormHandler = () => {
    onEditProfile();
    dispatch({ type: "UPDATE", payload: heroOriginalData });
  };

  const updateInfoHandler = (heroData) => {
    editHeroMutation.mutate({
      hero: { basicInfo: heroData, heroId: heroOriginalData._id },
      token,
    });
  };

  return (
    <>
      <HeroBasicInfo
        onSubmit={updateInfoHandler}
        title="Update Hero"
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <Button type="button" onClick={cancelFormHandler}>
        Cancel
      </Button>
    </>
  );
};

export default BasicInfoUpdate;
