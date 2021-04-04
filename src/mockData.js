const data = [
    {
      created_at: 1615370457000,
      first_name: "Семен",
      id: 1,
      is_active: true,
      last_name: "Иванов"
    },
    {
      created_at: 1615314992000,
      first_name: "Иван",
      id: 2,
      is_active: false,
      last_name: "Леонидов"
    },
    {
      created_at: 1615536000000,
      first_name: "Мария",
      id: 3,
      is_active: true,
      last_name: "Семенова"
    },
    {
      created_at: 1615726800000,
      first_name: "Илья",
      id: 4,
      is_active: false,
      last_name: "Мариинский"
    },
    {
      created_at: 1615233600000,
      first_name: "Сергей",
      id: 5,
      is_active: true,
      last_name: "Александровский"
    },
    {
      created_at: 1615206992000,
      first_name: "Полина",
      id: 6,
      is_active: false,
      last_name: "Сергеева"
    },
    {
      created_at: 1616000400000,
      first_name: "Александра",
      id: 7,
      is_active: true,
      last_name: "Леонова"
    },
    {
      created_at: 1616227077000,
      first_name: "Екатерина",
      id: 8,
      is_active: true,
      last_name: "Ивановская"
    }
  ];
  
  export const fetchData = async () => {
    const result = await new Promise((resolve) => {
      setTimeout(() => resolve(data), 3000);
    });
    return result;
  };