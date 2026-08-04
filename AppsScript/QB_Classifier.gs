/**
 * Advanced Question Classifier
 * Detects:
 * - Chapter
 * - Topic
 * - Question Type
 * - Marks
 * - Difficulty
 */

function classifyQuestion(questionText){


  const q =
  questionText
  .toLowerCase();



  let chapter =
  "General Physics";


  let topic =
  "Basic Physics";



  let questionType =
  "MCQ";


  let marks =
  1;



  let difficulty =
  "Medium";



  // -----------------------------
  // Question Type Detection
  // -----------------------------


  if(
    /assertion|statement\s*[-–]\s*1|statement\s*[-–]\s*2/
    .test(q)
  )
  {

    questionType =
    "Assertion Reason";

    marks = 1;

  }


  else if(
    /match the following|column\s*[-–]\s*i|column\s*[-–]\s*ii/
    .test(q)
  )
  {

    questionType =
    "Match the Following";

    marks = 4;

  }


  else if(
    /derive|prove|obtain the expression|show that|deduce/
    .test(q)
  )
  {

    questionType =
    "Derivation";

    marks = 5;

  }


  else if(
    /calculate|find|determine|compute|evaluate|numerical/
    .test(q)
  )
  {

    questionType =
    "Numerical";

    marks = 4;

  }


  else if(
    /explain|describe|state|define|mention|write/
    .test(q)
  )
  {

    questionType =
    "Short Answer";

    marks = 2;

  }



  // -----------------------------
  // Chapter Classification
  // -----------------------------


  if(
    /charge|electric field|equipotential|gauss|dipole|coulomb|capacitance|capacitor/
    .test(q)
  )
  {

    chapter =
    "Electrostatics";


    topic =
    "Electric Charges and Fields";

  }



  else if(
    /current|resistance|ohm|kirchhoff|wheatstone|galvanometer|cell|battery/
    .test(q)
  )
  {

    chapter =
    "Current Electricity";


    topic =
    "Electric Current and Resistance";

  }



  else if(
    /magnetic|ampere|maxwell|faraday|induction|lenz|magnetization|self-inductance|mutual inductance|transformer|magnetic permeability|magnetic susceptibility|eddy current|hysteresis|magnetic flux|motional emf|solenoid|cyclotron|lorentz/
    .test(q)
  )
  {

    chapter =
    "Magnetism and Electromagnetic Induction";


    topic =
    "Magnetic Field and Electromagnetic Induction";


    if(
      /lorentz|charged particle|cyclotron/
      .test(q)
    )
    {

      chapter =
      "Moving Charges and Magnetism";


      topic =
      "Lorentz Force and Magnetic Field";

    }

  }



  else if(
    /lens|mirror|microscope|interference|diffraction|polarization|snell/
    .test(q)
  )
  {

    chapter =
    "Optics";


    topic =
    "Ray and Wave Optics";

  }



  else if(
    /photoelectric|de broglie|quantum|dual nature/
    .test(q)
  )
  {

    chapter =
    "Dual Nature of Matter and Radiation";


    topic =
    "Quantum Physics";

  }



  else if(
    /atom|bohr|rutherford|nucleus|binding energy|radioactive|radioactivity/
    .test(q)
  )
  {

    chapter =
    "Atoms and Nuclei";


    topic =
    "Atomic and Nuclear Physics";

  }



  else if(
    /semiconductor|silicon|diode|transistor|logic gate/
    .test(q)
  )
  {

    chapter =
    "Semiconductor Electronics";


    topic =
    "Semiconductors";

  }



  else if(
    /wave|oscillation|frequency|sound|microwave|huygen/
    .test(q)
  )
  {

    chapter =
    "Waves";


    topic =
    "Wave Motion";

  }



  // Difficulty estimation

  if(
    marks >= 5 ||
    /derive|prove|obtain/
    .test(q)
  )
  {

    difficulty =
    "Hard";

  }

  else if(
    marks <= 1
  )
  {

    difficulty =
    "Easy";

  }



  return {


    Class:
    "12",


    Chapter_ID:
    chapter
    .replace(/\s+/g,"_")
    .toUpperCase(),


    Chapter_Name:
    chapter,


    Topic:
    topic,


    QuestionType:
    questionType,


    Marks:
    marks,


    Difficulty:
    difficulty


  };


}