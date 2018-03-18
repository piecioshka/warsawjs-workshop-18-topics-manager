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

* [x] Prezentacja listy tematów warsztatów

* [x] Pojedynczy temat zawiera:
    - [x] Tytuł warsztatu
    - [x] Lista osób, którzy zgłosili się jako trenerzy
        - [x] Autor (pierwszy trener) tematu jest odpowiednio wyróżniony
    - [x] Przyciski:
        - [x] Do głosowania na temat przez społeczność (np. serduszko)
        - [ ] Zabezpieczenie przed wielokrotnym głosowaniem
        - [x] Do zapisania kolejnego trenera
            - [x] Zabezpieczenie przed wielokrotnym zapisaniem

* [x] Formularza dodawania tematu
    - [x] Prezentacja dla zalogowanego użytkownika
    - [x] Resetowanie po wysłaniu formularza
    - [x] Zapisanie danych z formularza
    - [ ] Edycja wcześniej zgłoszonych przez siebie tematów

* [x] Osoby zgłaszające się jako trenerzy autoryzują się przez GitHuba
    i udostępniają tylko podstawowe dane o sobie.
    - [x] Stworzenie aplikacji autoryzującej
    - [x] Integracja z GitHub API
        - [x] Własna implementacja autoryzacji
        - [x] Wykorzystanie paczki `hellojs`
    - [x] Zalogowanie użytkownika
    - [x] Wylogowanie użytkownika

* [x] Temat zostaje wyróżniony w sytuacji kiedy zbierze on:
    - [x] min. 3 trenerów
    - [x] min. 40 uczestników (lajków)

* [ ] Tematy zapisywane są w:
    - [x] poziom początkujący: `in-memory`
    - [x] poziom podstawowy: `local storage`
    - [ ] poziom średni: `json server`
    - [ ] poziom zaawansowany: `firebase` / `sqlite` / `mongodb` / `azure`

## Krok po kroku

### Etap 0: Beforek :beer:

0. Stworzenie
    - katalogu `warsawjs-workshop-18-topics-manager`
    - a w nim pliku `index.html`

0. Stworzyć plik `package.json`

    ```
    npm init -f
    ```

0. Instalacja `parcel`-a:

    ```
    npm i parcel-bundler
    ```

0. Uruchomienie polecenie, które stworzy możliwość podgląda w przeglądarce:

    ```
    npx parcel index.html
    ```
    
    albo
    
    ```
    ./node_modules/.bin/parcel index.html
    ```
    
0. :star: Zadania dodatkowe:

    - Stworzenie zadania `npm run dev` w pliku `package.json`, które będzie uruchamiać
    
        ```
        parcel index.html
        ```
    
    - Stworzyć plik `.gitignore` z katalogiem `.cache/`

### Etap 1: Scaffold :file_folder:

0. Stworzyć plik `scripts/main.js`
0. Osadzić skrypt w pliku `index.html`
0. Zainstalować paczkę `bulma` (oraz jej największą zależność `node-sass`):

    ```
    npm i bulma node-sass
    ```

0. Dodać paczkę `bulma` w pliku `main.js` za pomocą fn `require`
0. Stworzyć nagłówek strony
0. Stworzyć menu strony
0. Dodać link (do menu) w celu logowania via `GitHub`
0. Podpiąć się pod jego kliknięcie i wyświetlić `console.log`

## Etap 2: Założenie aplikacji na GitHub :octocat:

0. Autoryzacja za pomocą `OAuth 2.0`

    - poziom podstawowy: wykorzystać paczkę `hellojs`
    - poziom zaawansowany: napisać mechanizm komunikujący się z GitHubem

    - TODO: prezentacja jak wygląda komunikacja z GitHubem

0. Wejdź na stronę: https://github.com/settings/applications/new
0. Stwórz nową aplikację. Poniżej opis pól:
    - `Application name` - dowolna nazwa (nie ma znaczenia)
    - `Homepage URL` - dowolny adres (nie ma znaczenia)
    - `Application description` - opis aplikacji (nie ma znaczenia) [opcjonalny]
    - `Authorization callback URL` - adres na który zostanie użytkownik przekierowany po zalogowaniu (**ma znaczenie**)

    Kliknij "Save"

0. Wejdź na stronę https://auth-server.herokuapp.com/
0. Zaloguj się (np. via GitHub)
0. Stwórz nową aplikację. Poniżej opis pól:
    - `reference` - dowolna nazwa (nie ma znaczenia)
    - `domain` - adres z aplikacją (**ma znaczenie**)
    - `client_id` - skopiuj z poprzedniej aplikacji (**ma znaczenie**)
    - `client_secret` - skopiuj z poprzedniej aplikacji (**ma znaczenie**)
    - `grant_url` - wpisz adres `https://github.com/login/oauth/access_token`

    Kliknij "Save"

0. Zainstalować paczkę `hellojs`

    ```
    npm i hellojs
    ```

0. Dodać paczkę `hellojs` w pliku `main.js` za pomocą fn `require`
0. Skonfigurować `hellojs` za pomocą `client_id`

    ```js
    hello.init({
        github: CLIENT_ID
    });
    ```

0. Podłączyć logowanie pod handler kliknięcia w przycisk.

    ```js
    hello('github').login();
    ```

    :bulb: **Pamiętać!** Wyłącz domyślne zachowania linki za pomocą `evt.preventDefault()`.

0. Stworzyć funkcję do pobierania profilu użytkownika.

    ```js
    hello('github').api('/me');
    ```

0. Nasłuchać na pobranie użytkownika i wyświetlić `login` i `avatar`

    Proponuję stworzyć funkcję `renderUserDetails`.<br/>
    :star: Wykorzystać dowolny system szablonów, np. `Mustache.js`.

0. Stworzyć przycisk do wylogowania i podłączyć pod niego funkcję:

    ```js
    hello.logout('github')
    ```
    
0. Odświeżyć stronę po wylogowaniu użytkownika za pomocą:

    ```js
    location.reload(true);
    ```

0. Pobierać użytkownika od razu na starcie aplikacji

    Zabezpieczyć się przed brakiem danych za pomocą:

    ```js
    hello('github').getAuthResponse();
    ```

0. Stworzyć plik `config.js` i przenieść do niego konfigurację zw. z GitHubem

0. :star: Zadania dodatkowe: 

    - Pokazywanie przycisku "Zaloguj" tylko dla niezalogowanego użytkownika
    - Pokazywanie przycisku "Wyloguj" tylko dla zalogowanego użytkownika

### Etap 3: Dodawanie tematu

0. Stworzyć listę tematów z nieprawdziwymi danymi, np.
    
    ```html
    <section class="section">
        <h1 class="title">Zgłoszone tematy</h1>
        <h2 class="subtitle">Zagłosuj na temat, aby został wkrótce zrealizowany</h2>
    
        <div class="columns is-multiline">
        
            <div class="column is-3">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            "Temat nr. 1"
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Opis tematu...
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Zagłosuj</a>
                        <a href="#" class="card-footer-item">Chcę być trenerem</a>
                    </footer>
                </div>
            </div>

            ...
        </div>
    </section>
    ```

0. Stworzyć formularz do dodawania tematu, np.

    ```html
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-half">
                <article class="message">
                    <div class="message-header">
                        <p>Zgłoś propozycję warsztatów</p>
                    </div>
                    <div class="message-body">
                        <form action="" class="js-form-add-topic">
                            <div class="field">
                                <label class="label">
                                    <sup class="has-text-danger">*</sup> Temat
                                </label>
                                <div class="control">
                                    <input class="input" type="text" name="topic" required/>
                                </div>
                            </div>
    
                            <div class="field">
                                <label class="label">
                                    <sup class="has-text-danger">*</sup> Opis
                                </label>
                                <div class="control">
                                    <textarea class="textarea" name="description" required></textarea>
                                </div>
                            </div>
    
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link">Prześlij</button>
                                </div>
                                <div class="control">
                                    <button class="button is-text" type="reset">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </article>
            </div>
        </div>
    </section>
    ```

0. Zapisywać w `in-memory storage` dane z wysłanego formularza

    Do przechowywania tematów proponuję wykorzystać kolekcję typu `Set`.
    
    Do pobierania danych z formularza polecam wykorzystać:
    ```js
    const $form = document.querySelector('.js-form-add-topic');
    const data = new FormData($form);
    const map = new Map(data.entries());
    console.log(map);
    ```

0. Odświeżyć listę tematów.

    Proponuję stworzyć funkcję `renderTopics`.
    Można wykorzystać dowolny system szablonów, np. `Mustache.js`.

0. Wyczyścić pola formularza.

    Proponuję wykorzystać funkcję `$form.reset()`.

0. :star: Zadania dodatkowe:

    - Pokazywać formularz z dodawaniem tylko dla zalogowanego użytkownika

### Etap 4: Głosowanie na temat

0. ...

### Etap 5: Zapisanie danych do `LocalStorage`

0. ...

### Etap 6: Zapisanie kolejnego trenera

0. ...

## Źródła, czyli tam gdzie warto zajrzeć

* Bulma
    - https://bulma.io/documentation/overview/start/
* OAuth 2.0
    - https://tools.ietf.org/html/rfc6749#section-4.1
    - https://www.youtube.com/watch?v=RyOiUpNSHxo
* GitHub
    - Lista moich aplikacji: https://github.com/settings/developers
    - Stworzenie nowej aplikacji: https://github.com/settings/applications/new
    - Listę aplikacji, które posiadają Twoje credentiale: https://github.com/settings/applications
    - Limity: http://api.github.com/rate_limit
    - Pomoc w zakładaniu aplikacji:
        - https://developer.github.com/apps/building-oauth-apps/
        - https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/
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
