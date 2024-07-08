import React from "react";
import _ from "lodash";
const Question = (props) => {
  const { data, handleCheckbox, index } = props;
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
            src={`data:image/jpeg;base64,${data.image}`}
            alt="img-question"
          />
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription} ?
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
