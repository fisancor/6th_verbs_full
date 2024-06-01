//=========================================
// File name: definitions.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Constants and classes for managing quizzes
//=========================================

const QMAKE_VERS = '4.0';
const QMAKE_PROGRAMNAME = "QuizFaber";
const QMAKE_URL = 'http://www.quizfaber.com';
const RESULT_PAGE_URL = "results.html";
const FINAL_PAGE_URL = "final.html";
const INITIAL_PAGE_URL = "index.html";

const QMAKE_MULTIANS = 1;  /* risposta multipla */
const QMAKE_MULTIANS_WITH_POINT = 101; /* risposta multipla con punteggio */
const QMAKE_BOOLEAN = 2;  /* risposta booleana */
const QMAKE_OPENANS = 3;  /* risposta aperta */
const QMAKE_FILLGAP = 4;  /* da riempire i vuoti */
const QMAKE_MATCHING = 5;  /* associazione tra coppie di parole */
const QMAKE_CUSTOMQST = 6;  /* tipologia di domanda personalizzata dall'utente */

const QMAKE_NO_VALUATION = 0;                /* nessuna valutazione */
const QMAKE_VALUATION_NEAR_TO_MARK = 1;      /* valutazione vicino al voto */
const QMAKE_VALUATION_REPLACE_MARK = 2;      /* valutazione che sostituisce il voto */
const QMAKE_VALUATION_REPLACE_RESULTS = 3;   /* valutazione che sostituisce tutti i risultati (non solo il voto) */
const QMAKE_VALUATION_WITH_LINK = 4;		 /* valutazione che rimanda ad una pagina */

const QMAKE_COMPUTE_MARK_BASIC = 0;
const QMAKE_COMPUTE_MARK_PRECISE = 1;
const QMAKE_COMPUTE_MARK_CUSTOM = 2;

const QMAKE_REPNOT_PT = 1;
const QMAKE_REPNOT_SIMPLE = 2;

const QMAKE_NO_SAVE = 0;
const QMAKE_SEND_WEBAPP = 4;
const QMAKE_SEND_NODEJS = 5;
const QMAKE_SEND_NODEJS_LOCAL = 6;  

const QUIZ_KEYWORD = "WokxofX2zSFGFwS&";

const USER_LOGIN_ANONYMOUS = "anonymous";
const USER_EMAIL_ANONYMOUS = "anonymous@anonymous.nowhere";

const options =
{
	name:"Verbs_6th",
	title: "Irregular Verbs - 6th PE",
	id: 0,
	numOfQuestions: 40,
	notValuatedQuestionsArray: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	maxtime: 1200,
	maxmark: 10,
	minmark: 0,
	roundmark: 0.25,
	questSlide: false,
	lockRightAns: false,
	computeMarkFnType: QMAKE_COMPUTE_MARK_BASIC,
	randQuest: true,
	allowChangeChoiceAlways: true,
	verifyQuestBeforeNext: true,
	verifyAtLeastOneChoice: false,
	radioChoiceInsteadOkButton: false,
	silentBeforeEndQuiz: true,
	uniqueOkButton: true,
	uniqueOkButtonPos: 'BOTTOM',
	showTimeout: true,
	allowAbandonFromQuiz: false,
	valuateAfterAbandon: true,
	needValuateQuiz: true,
	showFullReport: true,
	showFullQstReport: true,
	showFullAnsReport: true,
	showFullRemReport: true,
	reportNotation: QMAKE_REPNOT_SIMPLE,
	reviewQuizAtTheEnd: false,
	msgForNoValuateQuiz : '',
	matchingLockLeftCol: false,
	markPercentage: false,
	showPrintButton: false,
	showLinkButton: false,
	clearAlwaysHistory: true,
	disableRightClickMenu: true,
	needSaveQuiz: false,
	saveQuizMode: QMAKE_NO_SAVE,
	saveQuizUrl: "",
	allowRetakeQuiz: false,
	maxNumRetake: 100,
	upperMarkForRetake: 6,
	warnNeedRetake: false,
	isQuizAnonymous: false,
	needLogin: false,
	reportNumOfColumns: 2,
	hideTitleBar: false,
	hideStatusBar: false,
	includeProfile: true,
	author: "Fidel C. San Gregorio",
	argument: "FILL THE GAPS WITH THE CORRECT FORMS OF THE \"IRREGULAR VERBS\"",
	company: "Mª Auxiliadora - Lugo",
	quiz_date: "2022-23",
	playSounds: false,
	hasIntroText: true,
	hasEpilogueText: true,
	askPrintAtTheEnd: false
};

class Login
{
	constructor(name, email, hashPassword, sessionId)
	{
		this.name = name;
		this.email = email;
		this.password = hashPassword;
		this.sessionId = sessionId;
		this.otherFields = new Object();
	}
}

class Answer 
{
	constructor(choice,valuation,ansWeight,noAnsWeight, additionalText) 
	{
		this.choice = choice;
		this.valuation = valuation;
		this.ansWeight = ansWeight;
		this.noAnsWeight = noAnsWeight;
		this.additionalText = additionalText;
		this.shortTextAnswer = '';
		this.shortTextRemark = '';
		this.isGuess = false;
		this.score = 0;
	}
}

class Question 
{
	constructor(type, weight, numOfAnswers) 
	{
		this.typeOfQuestion = type;
		this.isSingleAns = false;
		this.weight = weight;
		this.answers = [];
		this.alreadyAnswered = false;
		this.nScore = 0;
		this.maxScore = 0;
		this.minScore = 0;
		this.nAnswers = numOfAnswers;
		this.valid = 0;
		this.shortTextQuestion = '';
		this.timeToAnswer = 0;
		this.noChoice = false;
	}
}

class Quiz
{
	constructor(numOfQuestions, startTime)
	{
		this.questions = new Array(numOfQuestions);
		this.currentQuestionPage = 1;
		this.isQuizCompleted = false;
		this.isQuizAbandoned = false;
		this.startTime = startTime;
		this.dateStartQuiz = new Date();
		this.dateCompleted = null;
		this.dateCompletedStr = '';
		this.time = 0;
		this.nRight = 0;
		this.nWrong = 0;
		this.nToDo = numOfQuestions;
		this.mark = 0;
		this.computeMarkErr = 0;
		this.userName = '';
		this.identityName = '';
		this.timeToAnswer = 0;

		this.ordineDomande = [];
		this.allSlidesIndex_before = new Array(numOfQuestions);
		this.allSlidesIndex_after = new Array(numOfQuestions);
		this.isQstDisplayed = new Array(numOfQuestions);
		for (var i=0; i<numOfQuestions; i++)
		{
			this.isQstDisplayed[i] = 0;
			this.allSlidesIndex_before[i] = new Array();
			this.allSlidesIndex_after[i] = new Array();
		}
		this.currentUser = null;
		this.numOfRetake = 0;
		this.options = options;
	}
}	
