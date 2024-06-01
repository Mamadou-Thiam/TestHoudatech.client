import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ContactService from "../../src/Services/ContactService";
import {
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ContactForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      ContactService.getById(id)
        .then((res) => {
          setContact(res);
          form.setFieldsValue(res);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du contact:", err);
        });
    }
  }, [id, form]);

  const handleCancel = () => {
    navigate("/");
  };

  const handleSaveContact = async (values) => {
    try {
      const data = {
        id: contact?.id,
        ...contact,
        ...values,
      };

      let savedContact;
      if (contact) {
        savedContact = await ContactService.update(id, data);
      } else {
        savedContact = await ContactService.create(data);
      }

      message.success("Contact enregistré avec succès !");
      navigate("/");
    } catch (error) {
      console.log("Erreur lors de l'enregistrement du contact:", error);
      message.error(
        error?.response?.data?.error ||
          "Erreur lors de l'enregistrement du contact."
      );
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        {contact ? (
          <>
            <EditOutlined style={{ marginRight: "8px", color: "#FF7900" }} />{" "}
            Modifier un contact
          </>
        ) : (
          <>
            <PlusOutlined style={{ marginRight: "8px", color: "#FF7900" }} />{" "}
            Ajouter un nouveau contact
          </>
        )}
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSaveContact}
        autoComplete="off"
      >
        <Form.Item
          label="Nom"
          name="nom"
          rules={[{ required: true, message: "Veuillez entrer le nom" }]}
        >
          <Input style={{ borderRadius: "0" }} />
        </Form.Item>

        <Form.Item
          label="Prénom"
          name="prenom"
          rules={[{ required: true, message: "Veuillez entrer le prénom" }]}
        >
          <Input style={{ borderRadius: "0" }} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Veuillez entrer l'adresse e-mail" },
            { type: "email", message: "L'adresse e-mail est invalide" },
          ]}
        >
          <Input style={{ borderRadius: "0", width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Numéro"
          name="numero"
          rules={[
            {
              required: true,
              message: "Veuillez entrer le numéro de téléphone",
            },
            {
              pattern: /^[0-9]+$/,
              message: "Veuillez entrer un numéro de téléphone valide",
            },
          ]}
        >
          <Input style={{ borderRadius: "0", width: "100%" }} />
        </Form.Item>

        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              background: "black",
              color: "white",
              borderRadius: "0px",
              width: "calc(50% - 4px)",
            }}
            onClick={handleCancel}
            icon={<CloseOutlined />}
          >
            Annuler
          </Button>
          <Button
            style={{
              background: "#FF7900",
              color: "white",
              borderRadius: "0px",
              width: "calc(50% - 4px)",
              marginLeft: "8px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
          >
            Enregistrer
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
