export type Id = string | number;

export type Column = {
  id: Id;
  name: string;
};

export type Task = {
  id: Id;
  id_user_leader: Id;
  content: string;
};
