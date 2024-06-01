import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Input, message, Popconfirm, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

import moment from "moment";
import { DataContact } from "../Models/contactModel";
import ContactService from "../../src/Services/ContactService";

const titleStyle = {
  color: "#FF7900",
};

const size = "large";
const width = 100;

const ContactList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<DataContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<DataContact | null>(
    null
  );
  const [filter, setFilter] = useState("");

  const handleViewContact = async (id: string) => {
    try {
      const contact = await ContactService.getById(id);
      setSelectedContact(contact);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du contact");
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await ContactService.delete(id);
      message.success("Contact supprimé avec succès !");
      loadData();
    } catch (error) {
      console.error(error);
      message.error(
        "Une erreur s'est produite lors de la suppression du contact."
      );
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await ContactService.fetchAll();
      setData(result);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du chargement des données :",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const f = filter.toLowerCase();
    if (f && f.trim().length > 0) {
      setFilteredData(
        data.filter(
          (d: DataContact) =>
            d.nom.toLowerCase().includes(f) ||
            d.prenom.toLowerCase().includes(f)
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [data, filter]);

  const handleEditContact = (id: string) => navigate(`/addContact/${id}`);

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      width: 100,
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
      width: 100,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Numéro",
      dataIndex: "numero",
      key: "numero",
      width,
    },
    {
      title: "Date Création",
      dataIndex: "createdAt",
      key: "createdAt",
      width,
      render: (text: string) => (
        <span style={{ color: "#0B5ED7" }}>
          {moment(text).format("DD/MM/YYYY - HH:mm")}
        </span>
      ),
    },
    {
      title: "Date Modification",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width,
      render: (text: string) => (
        <span style={{ color: "#0B5ED7" }}>
          {moment(text).format("DD/MM/YYYY - HH:mm")}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: "150px",
      render: (text: null, record: DataContact) => (
        <div>
          <Button
            type="link"
            style={{ color: "#FF7900" }}
            size={size}
            icon={<EditOutlined />}
            onClick={() => handleEditContact(record._id)}
          />
          <Button
            type="link"
            icon={<EyeOutlined />}
            style={{ color: "black" }}
            onClick={() => handleViewContact(record._id)}
          />
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer ce contact ?"
            onConfirm={() => handleDeleteContact(record._id)}
            okText="Oui"
            cancelText="Non"
            okButtonProps={{ style: { color: "white", background: "#66BB6A" } }}
            cancelButtonProps={{
              style: { color: "white", background: "#FF7900" },
            }}
          >
            <Button
              type="link"
              style={{ color: "red" }}
              size={size}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleAddContact = () => navigate("/addContact");

  return (
    <>
      <h1 className="text-3xl font-bold my-3 flex items-center">
        <ContactsOutlined style={{ fontSize: "1em", marginRight: "8px" }} />
        Liste des contacts
      </h1>
      <div className="flex justify-between gap-3">
        <Input
          placeholder="Rechercher par Nom ou Prénom"
          value={filter}
          suffix={<SearchOutlined />}
          style={{ borderRadius: "0px" }}
          size={size}
          className="flex-1"
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            style={{
              background: "black",
              color: "white",
              margin: "0 10px",
              borderRadius: "0px",
            }}
            icon={<PlusOutlined />}
            size={size}
            onClick={handleAddContact}
          >
            Nouveau
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Table
          loading={loading}
          bordered
          scroll={{ x: "scroll" }}
          columns={columns as any}
          dataSource={filteredData}
          rowKey={(r: DataContact) => r._id}
        />
      </div>
      <Modal
        title="Détails du Contact"
        visible={selectedContact !== null}
        onCancel={() => setSelectedContact(null)}
        footer={null}
        width={1000}
      >
        {selectedContact && (
          <Table
            dataSource={[selectedContact]}
            columns={[
              {
                title: <span style={titleStyle}>Nom</span>,
                dataIndex: "nom",
                key: "nom",
              },
              {
                title: <span style={titleStyle}>Prénom</span>,
                dataIndex: "prenom",
                key: "prenom",
              },
              {
                title: <span style={titleStyle}>Email</span>,
                dataIndex: "email",
                key: "email",
              },
              {
                title: <span style={titleStyle}>Numéro</span>,
                dataIndex: "numero",
                key: "numero",
              },
              {
                title: <span style={titleStyle}>Date Création</span>,
                dataIndex: "createdAt",
                key: "createdAt",
              },
              {
                title: <span style={titleStyle}>Date Modification</span>,
                dataIndex: "updatedAt",
                key: "updatedAt",
              },
            ]}
            bordered
            size="large"
            pagination={false}
          />
        )}
      </Modal>
    </>
  );
};

export default ContactList;
