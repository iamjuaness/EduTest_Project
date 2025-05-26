import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  Input,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Radio, RadioGroup } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';


// Types of  questions
const types = [
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Options",
    value: "options",
  },
  {
    label: "Boolean",
    value: "boolean",
  },
  { 
    label: "Ordenar", 
    value: "order" 
  },
];

export default function TeacherPage() {
  const [options, setOptions] = useState([]);
  const optionsArray = [...options];

  const [inputValue, setInputValue] = useState("");
  const [inputOption, setInputOption] = useState("");
  const [visibility, setVisivility] = useState(false);
  const [type, setType] = useState("text");
  const { control, handleSubmit, register, reset } = useForm(); // Usa "control" y "reset" de React Hook Form
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [newLeftItem, setNewLeftItem] = useState("");
  const [newRightItem, setNewRightItem] = useState("");
  const [editingLeftIndex, setEditingLeftIndex] = useState(null);
  const [editingRightIndex, setEditingRightIndex] = useState(null);
  const [editLeftValue, setEditLeftValue] = useState("");
  const [editRightValue, setEditRightValue] = useState("");

  // Data of exam
  const [examData, setExamData] = useState({
    questions: [
      {
        questionText: "",
        options: ["", ""],
        type: "",
        answerCorrect: "",
      },
    ],
  });

  const handleDeleteLeftItem = (idx) => {
    setLeftItems(leftItems.filter((_, i) => i !== idx));
  };
  
  const handleDeleteRightItem = (idx) => {
    setRightItems(rightItems.filter((_, i) => i !== idx));
  };

  const handleEditLeft = (idx) => {
    setEditingLeftIndex(idx);
    setEditLeftValue(leftItems[idx]);
  };
  
  const handleEditRight = (idx) => {
    setEditingRightIndex(idx);
    setEditRightValue(rightItems[idx]);
  };
  
  const saveEditLeft = (idx) => {
    const updated = [...leftItems];
    updated[idx] = editLeftValue;
    setLeftItems(updated);
    setEditingLeftIndex(null);
  };
  
  const saveEditRight = (idx) => {
    const updated = [...rightItems];
    updated[idx] = editRightValue;
    setRightItems(updated);
    setEditingRightIndex(null);
  };

  const handleAddLeftItem = () => {
    if (newLeftItem.trim() !== "") {
      setLeftItems([...leftItems, newLeftItem.trim()]);
      setNewLeftItem("");
    }
  };
  
  const handleAddRightItem = () => {
    if (newRightItem.trim() !== "") {
      setRightItems([...rightItems, newRightItem.trim()]);
      setNewRightItem("");
    }
  };

  const onSortEnd = (oldIndex, newIndex) => {
    setRightItems((array) => arrayMoveImmutable(array, oldIndex, newIndex));
  };

  const handleDeleteExamQuestion = (indexToDelete) => {
    setExamData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== indexToDelete),
    }));
  };

  

  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:8080/api/users/questions");
        console.log(response);
        if (!response.ok) {
          throw new Error("Error al obtener preguntas");
        }
        const data = await response.json();
        setAvailableQuestions(data); // data es un array de objetos (cada uno es un Map<String, Object> convertido a JSON)
      } catch (err) {
        setError(err.message || "Error de red");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  

  // Agregar una nueva pregunta
  const addQuestion = (data) => {
    const { bodyRequest, answer } = data;
  
    setExamData((prev) => ({
      questions: [
        ...prev.questions,
        {
          questionText: bodyRequest,
          options: type === "options" ? optionsArray : [],
          type,
          answerCorrect:
            type === "order"
              ? [...rightItems] // Guarda el orden correcto
              : answer,
          leftItems: type === "order" ? [...leftItems] : undefined, // Guarda los fijos
        },
      ],
    }));
  
    // Limpia los estados si quieres
    if (type === "order") {
      setLeftItems([]);
      setRightItems([]);
    }
  };

  const handleAddOption = () => {
    if (inputOption) {
      setOptions([...optionsArray, inputOption]); // Agrega el valor del input a la lista de opciones
      setInputOption(""); // Limpia el input
    }
  };

  const hangleTypeQuestion = () => {
    // console.log(optionsArray);

    if (type === "text") {
      return (
        <>
          <textarea
            placeholder="Ingrese una respuesta a las preguntas"
            className="w-full max-h-48 min-h-0 py-2 rounded-xl pl-2 "
          ></textarea>
        </>
      );
    }
    if (type === "boolean") {
      return (
        <>
          <div>
            <RadioGroup value={inputValue} onValueChange={setInputValue}>
              <Radio value="true">True</Radio>
              <Radio value="false">False</Radio>
            </RadioGroup>
          </div>
        </>
      );
    }
    if (type === "options") {
      return (
        <>
          <div className="lg:flex lg:flex-row lg:justify-between lg:gap-x-2">
            <Input
              type="text"
              placeholder="Add a option"
              value={inputOption}
              onChange={(e) => {
                setInputOption(e.target.value);
              }}
            ></Input>
            <Button
              color="primary"
              className="mt-3 lg:mt-0"
              onClick={handleAddOption}
            >
              {" "}
              New option
            </Button>
          </div>
          <div className="mt-3">
            <div>
              <RadioGroup value={inputValue} onValueChange={setInputValue}>
                {options.map((option, index) => (
                  <Radio value={option} key={index}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </div>
        </>
      );
    }

    if (type === "order") {
      return (
        <div className="flex gap-4">
          {/* Columna izquierda - fija */}
          <div>
            <h4>Fijos</h4>
            <div className="flex mb-2">
              <input
                type="text"
                value={newLeftItem}
                onChange={(e) => setNewLeftItem(e.target.value)}
                placeholder="Agregar item izquierdo"
                className="p-1 border rounded"
              />
              <Button size="sm" onClick={handleAddLeftItem}>Agregar</Button>
            </div>
            <ul>
              {leftItems.map((item, idx) =>
                editingLeftIndex === idx ? (
                  <li key={idx} className="mb-1 flex items-center">
                    <input
                      type="text"
                      value={editLeftValue}
                      onChange={(e) => setEditLeftValue(e.target.value)}
                      onBlur={() => saveEditLeft(idx)}
                      onKeyDown={e => e.key === "Enter" && saveEditLeft(idx)}
                      autoFocus
                      className="p-1 border rounded"
                    />
                    <Button
                      size="sm"
                      color="danger"
                      className="ml-2"
                      onClick={() => handleDeleteLeftItem(idx)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ) : (
                  <li
                    key={idx}
                    className="p-2 border-b cursor-pointer flex items-center"
                    onClick={() => handleEditLeft(idx)}
                    title="Haz click para editar"
                  >
                    {item}
                    <Button
                      size="sm"
                      color="danger"
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLeftItem(idx);
                      }}
                    >
                      Eliminar
                    </Button>
                  </li>
                )
              )}
            </ul>
          </div>
          {/* Columna derecha - ordenable */}
          <div>
            <h4>Ordena</h4>
            <div className="flex mb-2">
              <input
                type="text"
                value={newRightItem}
                onChange={(e) => setNewRightItem(e.target.value)}
                placeholder="Agregar item derecho"
                className="p-1 border rounded"
              />
              <Button size="sm" onClick={handleAddRightItem}>Agregar</Button>
            </div>
            <SortableList
              onSortEnd={onSortEnd}
              className="list"
              draggedItemClassName="dragged"
            >
              {rightItems.map((item, idx) =>
                editingRightIndex === idx ? (
                  <SortableItem key={idx}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editRightValue}
                        onChange={(e) => setEditRightValue(e.target.value)}
                        onBlur={() => saveEditRight(idx)}
                        onKeyDown={e => e.key === "Enter" && saveEditRight(idx)}
                        autoFocus
                        className="p-1 border rounded"
                      />
                      <Button
                        size="sm"
                        color="danger"
                        className="ml-2"
                        onClick={() => handleDeleteRightItem(idx)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </SortableItem>
                ) : (
                  <SortableItem key={idx}>
                    <div
                      className="p-2 border-b cursor-pointer bg-white flex items-center"
                      onClick={() => handleEditRight(idx)}
                      title="Haz click para editar"
                    >
                      {item}
                      <Button
                        size="sm"
                        color="danger"
                        className="ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRightItem(idx);
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </SortableItem>
                )
              )}
            </SortableList>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleSendExam = () => {
    console.log("está funcionadno");
  };

  return (
    <>
        <div className="exam-builder-container flex w-full h-full gap-6 p-32">
          {/* Izquierda */}
          <div className="available-questions flex-1 min-w-[300px] max-w-[400px]">
            <Card className="bg-slate-100 text-slate-800 text-xl w-full mb-6">
              <CardHeader className="text-center justify-center">
                <h1 className="text-cyan-950 font-bold">Preguntas disponibles</h1>
              </CardHeader>
              <CardBody>
              {availableQuestions.map((q, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b py-2">
                    <div>
                      <strong>{q.QUESTION_TEXT}</strong>
                      <div className="text-sm text-slate-600 capitalize">
                        {q.TYPE_ID === 2
                          ? "options"
                          : q.TYPE_ID === 1
                          ? "boolean"
                          : q.TYPE_ID === 3
                          ? "order"
                          : "Desconocido"}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => {
                        let normalized = { ...q };
                        // Traduce TYPE_ID a type string
                        if (normalized.TYPE_ID === 2) normalized.type = "options";
                        else if (normalized.TYPE_ID === 1) normalized.type = "boolean";
                        else if (normalized.TYPE_ID === 3) normalized.type = "order";
                        else normalized.type = "text";
                        setExamData((prev) => ({
                          ...prev,
                          questions: [...prev.questions, normalized],
                        }));
                      }}
                    >
                      Agregar
                    </Button>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
            {/* Derecha */}
          <div className="exam-creation flex-[2]">
            <div className="flex flex-col items-center gap-y-5 justify-center lg:ml-14 ">
              <section className="flex-row">
                <div>
                  <Card className=" bg-slate-400 text-slate-800 text-xl w-[700px] h-[480px]">
                    <CardHeader className="text-center justify-center">
                      <h1 className="mr-4 text-cyan-950 font-bold">
                        Create a new exam
                      </h1>
                    </CardHeader>

                    <CardBody className="transition-all">
                      <div className="">
                        <h2 className="mb-3">Add a new item</h2>
                        <div className={visibility ? "invisible" : ""}>
                          <form
                            className=" flex flex-col gap-5"
                            onSubmit={handleSubmit(addQuestion)}
                          >
                            <Input
                              {...register("bodyRequest", { required: true })}
                              type="text"
                              placeholder="Enter the body of your question"
                              label="Text"
                              key="bodyRequest"
                            ></Input>
                            <Select
                              // {...register("type", { required: true })}
                              label="Type"
                              placeholder="Select a type"
                              className="max-w-xs"
                              value={type}
                              onChange={(value) => {
                                setType(value.target.value); // Actualiza el tipo seleccionado
                              }}
                            >
                              {types.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </Select>

                            {/* options, boolean or textArea */}
                            <div>{hangleTypeQuestion()}</div>

                            {/*  correct answer*/}
                            <Input
                              {...register("answer", { required: true })}
                              className=""
                              placeholder="added correct answer"
                            ></Input>

                            {/* Button send a request a formulary */}
                            <div className=" flex justify-center items-center">
                              <Button
                                color="primary"
                                className="hover:bg-success"
                                type="submit"
                              >
                                New item
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </section>

              <section className="flex-row">
                <Card className=" bg-slate-400 text-slate-800 text-xl w-[700px]">
                  <CardHeader className="text-center justify-center">
                    <h1 className="text-cyan-950 font-bold">Preview Exam</h1>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-5 ">
                      {examData.questions.map((question, index) => (
                          <div key={index} className="mb-5 text-slate-950 relative">
                            {/* Botón eliminar arriba a la derecha */}
                            <Button
                              size="sm"
                              color="danger"
                              className="absolute top-0 right-0"
                              onClick={() => handleDeleteExamQuestion(index)}
                            >
                              Eliminar
                            </Button>
                          <div key={index} className="mb-5 text-slate-950">
                            <div className="flex gap-x-2">
                              <p>{index !== 0 ? index + ")" : ""}</p>
                              <p className="mb-3">{question.QUESTION_TEXT}</p>
                            </div>
                            {question.type === "text" && (
                              <textarea
                                placeholder="Escribe tu respuesta..."
                                onChange={(e) => {
                                  const newQuestions = [...examData.questions];
                                  newQuestions[index].answerCorrect = e.target.value;
                                  setExamData({ questions: newQuestions });
                                }}
                                className="w-full max-h-48 min-h-0 py-2 rounded-xl pl-2 "
                              />
                            )}
                            {question.type === "boolean" && (
                              <RadioGroup
                                value={question.answerCorrect}
                                onValueChange={(value) => {
                                  const newQuestions = [...examData.questions];
                                  newQuestions[index].answerCorrect = value;
                                  setExamData({ questions: newQuestions });
                                }}
                              >
                                <Radio value="true">True</Radio>
                                <Radio value="false">False</Radio>
                              </RadioGroup>
                            )}
                            {question.type === "order" && (
                              <div className="flex gap-4">
                                <div>
                                  <h4>Fijos</h4>
                                  <ul>
                                    {question.leftItems?.map((item, idx) => (
                                      <li key={idx} className="p-2 border-b">{item}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4>Orden correcto</h4>
                                  <ul>
                                    {question.answerCorrect?.map((item, idx) => (
                                      <li key={idx} className="p-2 border-b">{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                            {question.type === "options" && (
                              <RadioGroup
                                value={question.QUESTION_TEXT}
                                onValueChange={(value) => {
                                  const newQuestions = [...examData.questions];
                                  newQuestions[index].answerCorrect = value;
                                  setExamData({ questions: newQuestions });
                                }}
                              >
                                {question.options.map((option, optionIndex) => (
                                  <Radio key={optionIndex} value={option}>
                                    {option.OPTION_TEXT}
                                  </Radio>
                                ))}
                              </RadioGroup>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="justify-center flex items-center mt-5">
                        <Button
                          color="primary"
                          className="hover:bg-success"
                          onClick={handleSendExam}
                        >
                          Save Exam
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </section>
            </div>
          </div>
        </div>
    </>
  );
}
