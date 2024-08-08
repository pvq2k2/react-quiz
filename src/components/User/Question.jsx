import React, { useState } from "react";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
const Question = (props) => {
  const { data, handleCheckbox, index, isShowAnswer } = props;
  const { t } = useTranslation();

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleChangeAnswer = (e, aId, qId) => {
    handleCheckbox(aId, qId);
  };
  console.log(data);

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
            alt="img-question"
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={t("userquestion.questionimage")}
              onClose={() => setIsPreviewImage(false)}
            />
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        {t("userquestion.question")} {index + 1}: {data.questionDescription} ?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div className="a-child" key={`answer-${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    disabled={isShowAnswer}
                    checked={a.isSelected}
                    onChange={(e) =>
                      handleChangeAnswer(e, a.id, data.questionId)
                    }
                    id={`q-answer-${index}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`q-answer-${index}`}
                  >
                    {a.description}
                  </label>
                  {isShowAnswer === true && (
                    <>
                      {a.isSelected === true && a.isCorrect === false && (
                        <IoIosClose className="incorrect" />
                      )}

                      {a.isCorrect === true && (
                        <IoIosCheckmark className="correct" />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
