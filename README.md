# warsawjs-workshop-18-topics-manager 

> TODO

## Wymagania funkcjonalne

0. Prezentacja `card` z tematem warsztatów
    - tytuł warsztatu
    - lista trenerów, którzy mogli poprowadzić warsztat z tego tematu
        - zaznaczony trenerów, który zgłosić (wyróżnić)
    - przycisk do głosowania przez społeczność

1. użytkownicy mogą wprowadzać temat wydarzenia i opis wydarzenia
2. lajkowanie tematów poprzez kliknięcie w serduszko
3. autoryzacja przez GitHuba
    - imię i nazwisko
    - email
        - jak będziemy mieli email to możemy zbudować link do avatara za pomocą GRAVATARa:
            `'https://gravatar.com/avatar/' + md5(email) + '?s=200'`

3. Persystencja
    - początkujący: in-memory
    - średni: localStorage
    - średnio zaawansowani: firebase / sqlite / mongodb / azure

4. Zbieramy do momentu
    - 3 trenerów
    - 40 uczestników (lajków)
    - gdy dotrze do celu, to wyróżnić kartę
    
5. Zadanie dla chętnych:
    - zabezpieczenie przed wielokrotnym głosowaniem
    - edycja wcześniej zgłoszonych przez siebie tematów

## Krok po kroku

1. Stwórz formularz 

2. Autoryzacja za pomocą OAuth 2.0
    - https://tools.ietf.org/html/rfc6749#section-4.1
    - https://www.youtube.com/watch?v=RyOiUpNSHxo

2. Stworzenie aplikacji na GitHubie, w celu autoryzacji
    - https://developer.github.com/apps/building-oauth-apps/
        1. https://github.com/settings/applications/new
        2. https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/

    - TODO: prezentacja jak wygląda komunikacja z GitHubem
    
    Listę aplikacji, które posiadają Twoje credentiale:
    https://github.com/settings/applications

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018
