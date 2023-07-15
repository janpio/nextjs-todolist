interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createAt: Date;
  updateAt: Date;
  option?: Option;
}

interface Option {
  optionId: number;
  priority: number;
  settingTime: string;
  todoId: number;
}
