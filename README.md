# warsawjs-workshop-18-topics-manager 

> Aplikacja stworzona na potrzeby WarsawJS Workshop #18

![](http://warsawjs.com/assets/images/logo/logo-transparent-240x240.png)

---

## ✨ Development ✨

<kbd>Copy + Paste</kbd>

```
# Opcjonalnie
npm run mock:build
npm run mock:start-server
```

```
npm install
npm run dev
```

## :rocket: Deployment :rocket:

<kbd>Copy + Paste</kbd>

```
git checkout master
npm version patch
git push && git push --tags
```

## :bulb: O czym opowiedzieć? :bulb:

* "Autentykacja" (uwierzytelnianie) vs autoryzacja (kontrola dostępu)?
    - kim jesteś?
    - co możesz zrobić?
* Przykłady?
    - bankowość online
* OAuth 2.0 - standard w komunikacji między użytkownikiem a serwerem
* GitHub i jego aplikacje
    - po co są aplikacje?
    - dlaczego tak pobieramy dane o sobie, zamiast skorzystać z publicznego API?
    - limit autoryzacji z jednego uwierzytelniania = 10
    - limit autoryzacji będąc uwierzytelnionym = 60
* ...

## Zakres funkcjonalności projektu

1. [x] Prezentacja listy tematów warsztatów

2. [x] Element listy zawiera:
    - [x] Tytuł warsztatu
    - [x] Lista osób, którzy zgłosili się jako trenerzy
        - [x] Autor (pierwszy trener) tematu jest odpowiednio wyróżniony
    - [x] Przyciski:
        - [x] Do głosowania na temat przez społeczność (np. serduszko)
        - [x] Do zapisania kolejnego trenera
            - [x] Zabezpieczenie przed wielokrotnym zapisaniem

3. [x] Osoby zgłaszające się jako trenerzy autoryzują się przez GitHuba
    i udostępniają tylko podstawowe dane o sobie.
    - [x] Stworzenie aplikacji autoryzującej
    - [x] Integracja z GitHub API
        - [x] Własna implementacja autoryzacji
        - [x] Wykorzystanie paczki `hellojs`
    - [x] Zalogowanie użytkownika
    - [x] Wylogowanie użytkownika

4. [x] Temat zostaje wyróżniony w sytuacji kiedy zbierze on:
    - [x] min. 3 trenerów
    - [x] min. 40 uczestników (lajków)

5. [ ] Dane na temat tematów są zapisywane;
    - [x] poziom początkujący: `in-memory`
    - [x] poziom podstawowy: `local storage`
    - [ ] poziom średni: `json server`
    - [ ] poziom zaawansowany: `firebase` / `sqlite` / `mongodb` / `azure`

## Krok po kroku

### Etap 1: Scaffold :file_folder:

1. Stworzyć link do logowania via GitHub
2. Stworzyć formularz do dodawania tematu
3. Stworzyć listę tematów
4. Zapisywać dane z wysłanego formularza
5. Po zapisaniu formularza odświeżyć listę tematów
6. ...

### Etap 2: Autoryzacja via GitHub :octocat:

1. Autoryzacja za pomocą `OAuth 2.0`

    - poziom podstawowy: wykorzystać paczkę `hellojs`
    - poziom zaawansowany: napisać mechanizm komunikujący się z GitHubem

2. Stworzyć aplikację na GitHubie (w celu autoryzacji)
    - https://developer.github.com/apps/building-oauth-apps/
    - https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/

    - TODO: prezentacja jak wygląda komunikacja z GitHubem

### :bell: Zadania dla chętnych :bell:

- [ ] Zabezpieczenie przed wielokrotnym głosowaniem
- [ ] Edycja wcześniej zgłoszonych przez siebie tematów

## Źródła, czyli tam gdzie warto zajrzeć

* OAuth 2.0
    - https://tools.ietf.org/html/rfc6749#section-4.1
    - https://www.youtube.com/watch?v=RyOiUpNSHxo
* Github
    - Lista moich aplikacji: https://github.com/settings/developers
    - Stworzenie nowej aplikacji: https://github.com/settings/applications/new
    - Listę aplikacji, które posiadają Twoje credentiale: https://github.com/settings/applications
    - Limity: http://api.github.com/rate_limit
* Pomocne:
    - Zawijanie tekstu: https://css-tricks.com/almanac/properties/t/text-overflow/

## :package: Biblioteki :package:

* https://github.com/piecioshka/super-event-emitter
* https://github.com/parcel-bundler/parcel
* https://github.com/tschaub/gh-pages
* https://github.com/wycats/handlebars.js/
* https://github.com/kelektiv/node-uuid

## Mockowanie danych

* http://json-schema-faker.js.org/ - narzędzie, które buduje losowe dane w JSON
* http://json-schema.org - specyfikacja budowania
* http://chancejs.com/ - biblioteka zwraca losowe dane w odpowiednim formacie
* https://github.com/marak/Faker.js/ - budowanie wielu losowych danych

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018
