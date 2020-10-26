import React from 'react';
import './TodoTemplate.scss';

type TodoTemplateProps = {
  children: React.ReactNode;
}

function TodoTemplate ({ children }: TodoTemplateProps) {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
