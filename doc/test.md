## GET test/login(id)

Аутентифицировать как пользователя

__Параметры__
 
```id=1``` идентификатор пользователя 

## GET test/error

Получить ошибку в формате, котором отправляются все ошибки

__Ошибки__

|Код   |Сообщение   |Описание
|------|------------|--------
|1000+10              |Я тестовая ошибка | Данный метод всегда заканчивается такой ошибкой

## POST test/body

Принимает объект и выполняет простую операцию с каждым полем. 
Для целого - умножение, для массива - перебор элементова, для строки - поиск подстроки, для объекта перебор полей и сложение полей.

__Тело__

```json 
{
    "number": 1234,
    "string": "jklsdfg89rfs",
    "array": [1,2,3,4],
    "object": {"a":1, "b":2}
}
```

__Ошибки__

|Код   |Сообщение   |Описание
|------|------------|--------
|PHP_ERROR |PHP_MESSAGE             |Ошибка при вызове оператора / метода к переменной не того типа