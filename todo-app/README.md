# Hooks

## useReducer

- reducer에서 필요한 state와 action의 타입을 준비한다.

```
export type Todo = {
  id: number;
  text: string;
  checked: boolean;
}
type Todos = Todo[];
type TodoAction =
{ type: 'INSERT'; payload: Todo; }
| { type: 'REMOVE'; payload: number;}
| { type: 'TOGGLE'; payload: number;}

function todoReducer(todos: Todos, action: TodoAction) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.payload);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.payload);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}
```

## useState

- useState 제네릭 타입으로 할당하고 싶은 값의 타입을 넣을 수 있다.
- 안넣어도 상관없다.

```
const [value, setValue] = useState<string>('');
```

# Functional Component

## Component의 타입은 React.FC 또는 function 키워드로 props의 타입만 지정하는 방법이 있다.

## React.FC

- 전달 받는 Props에서 children 프로퍼티 타입을 선언해줄 필요가 없음

```
import React from "react";
type HelloProps = { word: string };
const Hello: React.FC<HelloProps> = ({ word }) => {
    return <div>{word}</div>;
};
export default Hello;
```

# function 키워드 Props 타입만 지정

```
import React from "react";
type HelloProps = { word: string; children?: React.ReactNode; };
function Hello({ word }: HelloProps) {
    return <div>{word}</div>;
}
export default Hello;
```

# Event Type

- onClick, onChange, onSubmit 등 event 발생 시 실행되는 함수에서 event 파라미터를 받을 수 있는데 이 event의 객체의 타입을 아는 방법은 해당 element event에 마우스를 올려 타입을 확인할 수 있다.
- onChange={handleChange} 이 부분에서 onChange에 마우스를 올리면 IDE가 타입 정보를 알려준다.
- (JSX attribute) React.InputHTMLAttributes<HTMLInputElement>.onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
- 위와 같은 정보에서 React.ChangeEvent<HTMLInputElement>가 onChange에서 넘겨주는 event 객체의 타입이다.

```
<input
    value={value}
    placeholder="할 일을 입력하세요"
    onChange={handleChange}
/>
```
