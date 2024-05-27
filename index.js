const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.DUOLINGO_JWT}`,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
}

const SESSION_PAYLOAD = {"challengeTypes":["assist","characterIntro","characterMatch","characterPuzzle","characterSelect","characterTrace","characterWrite","completeReverseTranslation","definition","dialogue","extendedMatch","extendedListenMatch","form","freeResponse","gapFill","judge","listen","listenComplete","listenMatch","match","name","listenComprehension","listenIsolation","listenSpeak","listenTap","orderTapComplete","partialListen","partialReverseTranslate","patternTapComplete","radioBinary","radioImageSelect","radioListenMatch","radioListenRecognize","radioSelect","readComprehension","reverseAssist","sameDifferent","select","selectPronunciation","selectTranscription","svgPuzzle","syllableTap","syllableListenTap","speak","tapCloze","tapClozeTable","tapComplete","tapCompleteTable","tapDescribe","translate","transliterate","transliterationAssist","typeCloze","typeClozeTable","typeComplete","typeCompleteTable","writeComprehension"],"fromLanguage":"en","isFinalLevel":false,"isV2":true,"juicy":true,"learningLanguage":"de","smartTipsVersion":2,"isCustomIntroSkill":false,"isGrammarSkill":false,"levelIndex":0,"pathExperiments":["UNIT_VISION_BB_93"],"showGrammarSkillSplash":false,"skillId":"d44e5b728ebafb827724bc99cef92f5d","type":"LESSON","levelSessionIndex":0};

const { sub } = JSON.parse(
  Buffer.from(process.env.DUOLINGO_JWT.split('.')[1], 'base64').toString(),
)

const { fromLanguage, learningLanguage, xpGains } = await fetch(
  `https://www.duolingo.com/2017-06-30/users/${sub}?fields=fromLanguage,learningLanguage,xpGains`,
  {
    headers,
  },
).then(response => response.json())

for (let i = 0; i < process.env.LESSONS; i++) {
  // Random Sleep
  await new Promise(r => setTimeout(r, Math.random() * 10000))
  
  //Start of Script
  const session = await fetch('https://www.duolingo.com/2017-06-30/sessions', {
    body: JSON.stringify(SESSION_PAYLOAD),
    headers,
    method: 'POST',
  }).then(response => response.json())

  const response = await fetch(
    `https://www.duolingo.com/2017-06-30/sessions/${session.id}`,
    {
      body: JSON.stringify({
        ...session,
        heartsLeft: 0,
        startTime: (+new Date() - 60000) / 1000,
        enableBonusPoints: false,
        endTime: +new Date() / 1000,
        failed: false,
        maxInLessonStreak: 9,
        shouldLearnThings: true,
      }),
      headers,
      method: 'PUT',
    },
  ).then(response => response.json())

  console.log({ xp: response.xpGain })
}
