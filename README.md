# warsawjs-workshop-18-topics-manager 

> Aplikacja stworzona na potrzeby WarsawJS Workshop #18

![](http://warsawjs.com/assets/images/logo/logo-transparent-240x240.png)

## Zakres funkcjonalności projektu

1. Prezentacja listy tematów warsztatów

2. Element listy zawiera:
    - tytuł warsztatu
    - lista osób, którzy zgłosili się jako trenerzy
        - autor tematu jest odpowiednio wyróżniony
    - przyciski:
        - do głosowania na temat przez społeczność (np. serduszko)
        - do podłączenia kolejnego trenera

3. Osoby zgłaszające się jako trenerzy autoryzują się przez GitHuba
    i udostępniają tylko podstawowe dane o sobie:
    - imię i nazwisko
    - email
        - można zbudować link do avatara za pomocą GRAVATARa według wzoru:
            `'https://gravatar.com/avatar/' + md5(email) + '?s=200'`

4. Dane na temat tematów są zapisywane;
    - poziom początkujący: `in-memory`
    - poziom średni: `local storage`
    - poziom zaawansowany: `firebase` / `sqlite` / `mongodb` / `azure`

5. Temat zostaje wyróżniony w sytuacji kiedy zbierze on:
    - min. 3 trenerów
    - min. 40 uczestników (lajków)

6. Zadania dla chętnych:
    - Zabezpieczenie przed wielokrotnym głosowaniem
    - Edycja wcześniej zgłoszonych przez siebie tematów

## Krok po kroku

1. Stworzyć link do logowania za pomocą GitHuba

2. Autoryzacja za pomocą `OAuth 2.0`

    - poziom podstawowy: wykorzystać paczkę w `npm`
    - poziom zaawansowany: napisać mechanizm komunikujący się z GitHubem

2. Stworzenie aplikacji na GitHubie, w celu autoryzacji
    - https://developer.github.com/apps/building-oauth-apps/
    - https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/

    - TODO: prezentacja jak wygląda komunikacja z GitHubem
    
    Listę aplikacji, które posiadają Twoje credentiale:
    https://github.com/settings/applications

## 📦 Deployment :rocket:

<kbd>Copy + Paste</kbd>

```
git checkout master
npm run build           # build distribution package
npm run deploy          # upload dist/ folder to "gh-pages" branch
npm version patch
git push
git push --tags
```

## Linki

* OAuth 2.0
    - https://tools.ietf.org/html/rfc6749#section-4.1
    - https://www.youtube.com/watch?v=RyOiUpNSHxo
* Github
    - Lista moich aplikacji: https://github.com/settings/developers
    - Stworzenie nowej aplikacji: https://github.com/settings/applications/new

## Biblioteki

* https://github.com/parcel-bundler/parcel
* https://github.com/tschaub/gh-pages

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018
