import { Button, Progress } from "antd";
import { nextStep, prevStep } from "../../redux/slices/activeStepSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { QUESTIONS, type Data } from "./tripQuestions";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { useNavigate } from "react-router";
import Blob from "@/assets/icons/blob.svg";
import Bike from "@/assets/icons/bike.png";
import { useState, useEffect } from "react";
import { useGenerateTripMutation } from "../../api/baseApi/trip/tripApi";
import type { GenerateTripData } from "../../api/baseApi/trip/types";

//TODO: CHECK PWA



export const TripQuestionPage = () => {

  const [generate] = useGenerateTripMutation();

  const { value } = useAppSelector((state) => state.activeStep);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Data>({
    time: 0,
    type: "cultural",
    tags: []

  });
  useEffect(() => {
    if(value === QUESTIONS.length) {
      console.log("Final data:", formData);
      if(formData.tags === undefined || formData.tags.length === 0 || formData.time === undefined || formData.type === undefined) {
        throw new Error("Missing required fields");
        return;
      }
      generate(formData as GenerateTripData).then((response) => {
        if (response.data) {
          navigate(`/map/${response.data._id}`);
        }
      });
    }
  }, [value]);

  return (
    <div className="px-8 pt-15">
      <div className="flex gap-2 relative mb-5">
        <Button
          onClick={() => (value === 0 ? navigate(-1) : dispatch(prevStep()))}
          icon={<img src={ArrowLeft} alt="Back" />}
          type="text"
          className="absolute -top-1"
        />
        <Progress
          percent={((value + 1) / (QUESTIONS.length + 1)) * 100}
          strokeColor={"#3DE5AA"}
          format={() => ""}
        />
      </div>
      <h2 className="font-semibold text-2xl">{QUESTIONS[value]?.question}</h2>
      <div className="flex flex-col gap-3 mt-8">
        {QUESTIONS.length > value ? QUESTIONS[value]?.answers.map((answer) => (
          <button
            key={answer.id}
            className="border-2 bg-white rounded-xl px-4 py-2 border-gray-300 text-start  border-b-4"
            onClick={() => {
              if (answer.value) {
                setFormData({
                  tags: answer.value.tags ? answer.value.tags : formData.tags,
                  time: answer.value.time ? answer.value.time : formData.time,
                  type: answer.value.type ? answer.value.type : formData.type,
                });
              }
              dispatch(nextStep());
            }}
          >
            {answer.text}
          </button>
        )):
        <>
          <div>
            <div className="container">
              <div className="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
              </div>
            </div>
            <p className="text-center mb-5">Generowanie trasy...</p>
          </div>
        </>
      
      }
      </div>
      <div className="-z-10">
        <img
          src={Blob}
          className="absolute -z-10 -bottom-20 left-1/2 transform -translate-x-1/2 w-76"
        />
        <img
          src={Bike}
          className="absolute -z-10 -bottom-5  left-1/2 transform -translate-x-1/2  w-60"
        />
      </div>
    </div>
  );
};
