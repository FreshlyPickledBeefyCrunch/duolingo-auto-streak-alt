# duolingo

[![Keep my Duolingo streak](https://github.com/rfoel/duolingo/actions/workflows/study.yml/badge.svg?branch=main)](https://github.com/FreshlyPickledBeefyCrunch/duolingo/actions/workflows/study.yml)

[![Keep my Duolingo streak](https://github.com/rfoel/duolingo/actions/workflows/streak-keeper.yml/badge.svg?branch=main)](https://github.com/FreshlyPickledBeefyCrunch/duolingo/actions/workflows/streak-keeper.yml)

<img src="duo.svg" width="128px"/>

Streak keeper and XP farm for Duolingo that can be automated using Github Actions. Never get demoted again!

### How to use
1. [Fork this repository](https://github.com/rfoel/duolingo/fork)
2. Go to [Duolingo](https://www.duolingo.com)
3. While logged in, open the browser's console (Option (⌥) + Command (⌘) + J (on macOS) or Shift + CTRL + J (on Windows/Linux))
4. Get the JWT token by pasting this in the console, and copy the value ( without `'`)

```js
document.cookie
  .split(';')
  .find(cookie => cookie.includes('jwt_token'))
  .split('=')[1]
 ```
  
  5. Go to your forked repository
  6. Go to Settings > Secrets and Variables > Actions . And click the button `New Repository secret`
  7. For the secret name use `DUOLINGO_JWT` and for the secret value use the copied value from step 4.
  8. Go the your forked repository and go the Actions tab and press the button `I understand my workflows, go ahead and enable them`

For `SESSION_PAYLOAD` in `index.js`, replace the sample SESSION_PAYLOAD with your own:

Video Guide to retrieve `SESSION_PAYLOAD`: https://github.com/Sodiumchloridy/duolingo-auto-streak/assets/67376832/b9dfa837-cadd-4343-b767-73ab71d89d80

1. While in Duolingo web app, open developer console [F12], navigate to 'Network' tab, proceed to start a lesson.
2. Find the 'sessions' request, then under 'Payload' tab > 'view source' then copy & paste it to SESSION_PAYLOAD.
*You might need to refresh the webpage (CTRL + R) to find the 'sessions' request.
4. You're all set, head to Github Actions > 'Do a Duolingo lesson' > 'Run workflow' to do a test run. 

## Workflows

### 🔥 Streak Keeper

This project uses GitHub Actions scheduled workflow to keep your streak alive. The workflow can be viewed [here](.github/workflows/streak-keeper.yml).

### 📚 Study

This repository can also "study" lessons for you. This will give you XP so you won't get demoted never again! This workflow uses [workflow_dispatch](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch) to trigger the study session. You can choose the number of lessons to be done. The workflow can be viewed [here](.github/workflows/study.yml).

## Caveats

- This project won't help with your daily or friend quests, it can only earn XP to move up the league rank;
- This project won't do real lessons or stories, only practices, so it won't affect your learning path;
