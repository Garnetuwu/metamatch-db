import { useDispatch } from "react-redux";
import HeroBasicInfo from "../HeroForm/HeroBasicInfo";
import useHeroRequests from "../../hooks/useHeroRequests";
import Button from "../UI/Button";
import { useEffect } from "react";

const BasicInfoUpdate = ({ onEditProfile, heroData: heroOriginalData }) => {
  const { editHeroMutation } = useHeroRequests(heroOriginalData._id);
  const { isSuccess, isLoading, isError, error } = editHeroMutation;

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      onEditProfile();
    }
  }, [isSuccess]);

  const cancelFormHandler = () => {
    onEditProfile();
    dispatch({ type: "UPDATE", payload: heroOriginalData });
  };

  const updateInfoHandler = (heroData) => {
    editHeroMutation.mutate({
      hero: heroData,
      token,
      heroId: heroOriginalData._id,
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
