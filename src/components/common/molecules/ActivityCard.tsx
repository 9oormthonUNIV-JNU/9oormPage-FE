import CustomCard from "../atoms/CustomCard";
import CustomTag from "../atoms/CustomTag";

export type ProjectActivity = {
  type: "project";
  post_title: string;
  image: string;
  project_category: string;
};

export type SeminarActivity = {
  type: "seminar";
  post_title: string;
  period: string;
  image: string;
};

export type NetworkingActivity = {
  type: "networking";
  post_title: string;
  period: string;
  image: string;
};

export type StudyActivity = {
  type: "study";
  post_title: string;
  period: string;
  image: string;
  part: string;
};

export type ActivityProps =
  | ProjectActivity
  | SeminarActivity
  | NetworkingActivity
  | StudyActivity;

const ActivityCard: React.FC<ActivityProps> = (props) => {
  return (
    <CustomCard className="w-[480px] h-[450px] flex-col">
      <div className="h-[270px] w-full">
        <img src={props.image} className="w-full h-full object-cover" />
      </div>
      <div className="px-5 py-5">
        <div className="text-b2">{props.post_title}</div>
        <div className="flex gap-3 pt-4">
          {props.type === "project" && (
            <>
              <CustomTag>{props.project_category}</CustomTag>
            </>
          )}
          {props.type === "seminar" && (
            <>
              <CustomTag>{props.period}</CustomTag>
            </>
          )}
          {props.type === "networking" && (
            <>
              <CustomTag>{props.period}</CustomTag>
            </>
          )}
          {props.type === "study" && (
            <>
              <CustomTag>{props.period}</CustomTag>
              <CustomTag bgColor="#f7f7f7">{props.part}</CustomTag>
            </>
          )}
        </div>
      </div>
    </CustomCard>
  );
};

export default ActivityCard;
