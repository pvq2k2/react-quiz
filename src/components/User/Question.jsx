import React, { useState } from "react";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";
const Question = (props) => {
  const { data, handleCheckbox, index } = props;
  const { t } = useTranslation();

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleChangeAnswer = (e, aId, qId) => {
    handleCheckbox(aId, qId);
  };
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
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
