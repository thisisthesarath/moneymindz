import React, { useRef, useState } from 'react';
import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Modal, Space, Button, Form, Input, InputNumber, DatePicker } from 'antd';
import { FiDollarSign } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import BasePageContainer from '../layout/PageContainer';
import {
  handleErrorResponse,
  NotificationType,
  showNotification,
} from '../../utils';


enum ActionKey {
  DELETE = 'delete',
}

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: 'dashboard',
      title: <Link to="/">Home</Link>,
    },
    {
      key: 'finances',
      title: <Link to="/finances">Finances</Link>,
    },
  ],
};

const initialExpenses = [
  { expense_date: "2024-08-01", expense_name: "Groceries", expense_amount: 150.00, expense_category: "Food" },
  { expense_date: "2024-08-03", expense_name: "Rent", expense_amount: 1200.00, expense_category: "Housing" },
  { expense_date: "2024-08-05", expense_name: "Gym Membership", expense_amount: 50.00, expense_category: "Health & Fitness" },
  { expense_date: "2024-08-02", expense_name: "Electricity Bill", expense_amount: 100.00, expense_category: "Utilities" },
  { expense_date: "2024-08-06", expense_name: "Movie Tickets", expense_amount: 25.00, expense_category: "Entertainment" },
  { expense_date: "2024-08-04", expense_name: "Coffee Shop", expense_amount: 10.00, expense_category: "Food" },
  { expense_date: "2024-08-07", expense_name: "Internet Bill", expense_amount: 60.00, expense_category: "Utilities" },
  { expense_date: "2024-08-09", expense_name: "Dining Out", expense_amount: 80.00, expense_category: "Food" },
  { expense_date: "2024-08-01", expense_name: "Gasoline", expense_amount: 40.00, expense_category: "Transportation" },
  { expense_date: "2024-08-05", expense_name: "Office Supplies", expense_amount: 30.00, expense_category: "Miscellaneous" },
  { expense_date: "2024-08-03", expense_name: "Online Shopping", expense_amount: 200.00, expense_category: "Shopping" },
  { expense_date: "2024-08-08", expense_name: "Rent", expense_amount: 1100.00, expense_category: "Housing" },
];

const Finances = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const [expenses, setExpenses] = useState(initialExpenses);

  const columns: ProColumns[] = [
    {
      title: 'Date',
      dataIndex: 'expense_date',
      sorter: false,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'expense_name',
      sorter: false,
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'expense_amount',
      sorter: false,
      align: 'center',
      render: (text: number) => `₹${text.toFixed(2)}`,
    },
    {
      title: 'Category',
      dataIndex: 'expense_category',
      sorter: false,
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      render: (_, row) => [
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => handleActionOnSelect(key, row)}
          menus={[
            {
              key: ActionKey.DELETE,
              name: (
                <Space>
                  <DeleteOutlined />
                  Delete
                </Space>
              ),
            },
          ]}
        >
          <CiCircleMore className="text-primary text-xl" />
        </TableDropdown>,
      ],
    },
  ];

  const handleActionOnSelect = (key: string, expense) => {
    if (key === ActionKey.DELETE) {
      showDeleteConfirmation(expense);
    }
  };

  const showDeleteConfirmation = (expense) => {
    modal.confirm({
      title: 'Are you sure to delete this expense?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <ProDescriptions column={1} title=" ">
          <ProDescriptions.Item valueType="text" label="Name">
            {expense.expense_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Date">
            {expense.expense_date}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Amount">
            ${expense.expense_amount.toFixed(2)}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Category">
            {expense.expense_category}
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
      okButtonProps: {
        className: 'bg-primary',
      },
      onOk: () => {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((e) => e.expense_name !== expense.expense_name)
        );
        showNotification(
          'Success',
          NotificationType.SUCCESS,
          'Expense is deleted.'
        );

        actionRef.current?.reloadAndRest?.();
      },
    });
  };

  const onFinish = (values) => {
    const newExpense = {
      expense_date: values.date.format('YYYY-MM-DD'),
      expense_name: values.name,
      expense_amount: values.amount,
      expense_category: values.category,
    };
    setExpenses([...expenses, newExpense]);
    showNotification(
      'Success',
      NotificationType.SUCCESS,
      'Expense is added.'
    );
    actionRef.current?.reloadAndRest?.();
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form layout="inline" onFinish={onFinish}>
        <Form.Item name="date" rules={[{ required: true, message: 'Please select a date!' }]}>
          <DatePicker placeholder="Select Date" />
        </Form.Item>
        <Form.Item name="name" rules={[{ required: true, message: 'Please enter the name!' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="amount" rules={[{ required: true, message: 'Please enter the amount!' }]}>
          <InputNumber placeholder="Amount" min={0} step={0.01} />
        </Form.Item>
        <Form.Item name="category" rules={[{ required: true, message: 'Please enter the category!' }]}>
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item>
        <button type="submit" class="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded">
          Add Expense
        </button>

        </Form.Item>
      </Form>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Finances',
          tooltip: {
            className: 'opacity-60',
            title: 'Mocked data',
          },
          title: <FiDollarSign className="opacity-60" />,
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={'fixed'}
        rowSelection={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        actionRef={actionRef}
        request={(params) => {
          return new Promise((resolve) => {
            resolve({
              data: expenses,
              success: true,
              total: expenses.length,
            } as RequestData);
          }).catch((error) => {
            handleErrorResponse(error);

            return {
              data: [],
              success: false,
            } as RequestData;
          });
        }}
        dateFormatter="string"
        search={false}
        rowKey="expense_name"
        options={{
          search: false,
        }}
      />
      {modalContextHolder}
    </BasePageContainer>
  );
};

export default Finances;
