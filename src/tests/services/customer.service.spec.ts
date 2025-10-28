import { CustomerService } from "../../services/customer.service";

describe("CustomerService", () => {
  let mockRepository: any;
  let service: CustomerService;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new CustomerService(mockRepository);
  });

  // --- GET ALL ---
  it("should return a list of customers", async () => {
    const mockData = [{ id: 1, name: "John" }];
    mockRepository.findAll.mockResolvedValue(mockData);

    const result = await service.getAll("user-1");

    expect(result).toEqual(mockData);
    expect(mockRepository.findAll).toHaveBeenCalledWith("user-1");
  });

  it("should throw an error if findAll fails", async () => {
    mockRepository.findAll.mockRejectedValue(new Error("DB error"));
    await expect(service.getAll("user-1")).rejects.toThrow("Failed to load customers.");
  });

  // --- GET BY ID ---
  it("should return a customer by id", async () => {
    const mockCustomer = { id: 1, name: "John" };
    mockRepository.findById.mockResolvedValue(mockCustomer);

    const result = await service.getById(1, "user-1");
    expect(result).toEqual(mockCustomer);
  });

  it("should throw if customer not found", async () => {
    mockRepository.findById.mockResolvedValue(null);

    // ajustado: service lança "Failed to fetch the customer."
    await expect(service.getById(99, "user-1"))
      .rejects.toThrow("Failed to fetch the customer.");
  });

  // --- CREATE ---
  it("should create a customer successfully", async () => {
    const dto = { name: "New Customer" };
    const created = { id: 10, name: "New Customer" };
    mockRepository.create.mockResolvedValue(created);

    const result = await service.create(dto as any, "user-1");

    expect(result).toEqual(created);
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it("should throw duplicate error on P2002", async () => {
    mockRepository.create.mockRejectedValue({ code: "P2002" });

    await expect(service.create({ name: "Dup" } as any, "user-1"))
      .rejects.toThrow("Duplicate customer detected.");
  });

  // --- UPDATE ---
  it("should update customer successfully", async () => {
    const updated = { id: 1, name: "Updated" };
    mockRepository.update.mockResolvedValue(updated);

    const result = await service.update(1, { name: "Updated" } as any, "user-1");
    expect(result).toEqual(updated);
  });

  it("should throw error if customer not found for update", async () => {
    mockRepository.update.mockResolvedValue(null);

    // ajustado: service lança "Failed to update the customer."
    await expect(service.update(99, { name: "Fail" } as any, "user-1"))
      .rejects.toThrow("Failed to update the customer.");
  });

  it("should throw Prisma error P2025 on update", async () => {
    mockRepository.update.mockRejectedValue({ code: "P2025" });

    await expect(service.update(99, { name: "Fail" } as any, "user-1"))
      .rejects.toThrow("Customer not found for update.");
  });

  // --- DELETE ---
  it("should delete customer successfully", async () => {
    mockRepository.delete.mockResolvedValue(true);
    await expect(service.delete(1, "user-1")).resolves.not.toThrow();
  });

  it("should throw Prisma error P2025 on delete", async () => {
    mockRepository.delete.mockRejectedValue({ code: "P2025" });

    await expect(service.delete(1, "user-1"))
      .rejects.toThrow("Customer not found for deletion.");
  });
});
