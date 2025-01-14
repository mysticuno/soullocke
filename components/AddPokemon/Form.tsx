import { Button, Checkbox, Form, Input, Select } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import cn from "classnames";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Form.module.scss";

const { Option } = Select;

function AddPokemonForm({
  defaultValues,
  finishText = "Add",
  onFinish,
  onCancel,
  showCaughtCheckbox = true,
}: {
  defaultValues?: { pokemon: string; nickname: string };
  finishText?: string;
  onFinish?: (pokemonName: string, nickname: string, caught: boolean) => void;
  onCancel?: () => void;
  showCaughtCheckbox?: boolean;
}) {
  const { allPokemon } = React.useContext(RunContext);
  const [pokemon, setPokemon] = React.useState<string | undefined>(
    defaultValues?.pokemon,
  );
  const [nickname, setNickname] = React.useState<string | undefined>(
    defaultValues?.nickname,
  );
  const [caught, setCaught] = React.useState(true);

  const [form] = Form.useForm();

  const handleFinish = () => {
    if (pokemon) onFinish?.(pokemon, nickname || pokemon, caught);

    form.resetFields();
    setPokemon(undefined);
    setNickname(undefined);
    setCaught(true);
  };

  const handlePokemonChange = (value: string) => setPokemon(value);
  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = (
    evt,
  ) => setNickname(evt.target.value);
  const handleCaughtChange = (evt: CheckboxChangeEvent) =>
    setCaught(evt.target.checked);

  const handleCancel = () => {
    form.resetFields();
    setPokemon(undefined);
    setNickname(undefined);
    setCaught(true);
    if (onCancel) onCancel();
  };

  return (
    <Form
      form={form}
      name="addPokemon"
      onFinish={handleFinish}
      initialValues={defaultValues}
    >
      <Form.Item
        className={styles.item}
        name="pokemon"
        rules={[
          {
            required: caught,
            message: "Please choose what Pokémon was caught",
          },
        ]}
      >
        <Select
          className={styles.select}
          onChange={handlePokemonChange}
          value={pokemon}
          placeholder="Select a Pokémon"
          showSearch
        >
          {allPokemon?.map((p) => (
            <Option key={p.name} value={p.name} className={styles.option}>
              {p.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item className={styles.item} name="nickname">
        <Input
          onChange={handleNicknameChange}
          value={nickname}
          placeholder="Nickname"
        />
      </Form.Item>

      {showCaughtCheckbox && (
        <Form.Item className={styles.item} name="caught" initialValue={true}>
          <Checkbox onChange={handleCaughtChange} checked={caught}>
            Caught
          </Checkbox>
        </Form.Item>
      )}

      <Form.Item className={cn(styles.itemButtons, "formButtons")}>
        {onCancel && <Button onClick={handleCancel}>Cancel</Button>}

        <Button type="primary" htmlType="submit">
          {finishText}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddPokemonForm;
