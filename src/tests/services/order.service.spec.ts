import { OrderService } from "../../services/order.service";
import { OrderMapper } from "../../mappers/order.mapper";
import { OrderFilters } from "../../interfaces/OrderFilters";
import { OrderStatus } from "../../enums/order-status.enum";

describe("OrderService", () => {
  let mockRepository: any;
  let service: OrderService;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new OrderService(mockRepository);
  });

  it("should return a list of orders with filters applied", async () => {
    const mockData = [{ id: 1, total: 100 }];
    const filters: OrderFilters = {
      status: OrderStatus.Approved,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
      customerId: 5,
    };
    mockRepository.findAll.mockResolvedValue(mockData);

    const result = await service.getAll("user-1", filters);

    const dtoOrders = OrderMapper.toDTOList(mockData as any);
    expect(result).toEqual(OrderMapper.toDTOCoreDataList(dtoOrders));
    expect(mockRepository.findAll).toHaveBeenCalledWith("user-1", filters);
  });

  it("should throw an error if findAll fails", async () => {
    mockRepository.findAll.mockRejectedValue(new Error("DB error"));
    await expect(service.getAll("user-1")).rejects.toThrow(
      "Failed to load orders."
    );
    expect(mockRepository.findAll).toHaveBeenCalledWith("user-1", undefined);
  });

  it("should return an order by id", async () => {
    const mockOrder = { id: 1, total: 200 };
    mockRepository.findById.mockResolvedValue(mockOrder);

    const result = await service.getById(1, "user-1");

    expect(result).toEqual(mockOrder);
    expect(mockRepository.findById).toHaveBeenCalledWith(1, "user-1");
  });

  it("should throw if order not found", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.getById(99, "user-1")).rejects.toThrow(
      "Failed to fetch the order."
    );
  });

  it("should create an order successfully", async () => {
    const dto = { total: 300 };
    const created = { id: 10, total: 300 };
    mockRepository.create.mockResolvedValue(created);

    const result = await service.create(dto as any, "user-1");

    expect(result).toEqual(created);
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it("should throw error if foreign key invalid (P2003)", async () => {
    mockRepository.create.mockRejectedValue({ code: "P2003" });

    await expect(
      service.create({ total: 100 } as any, "user-1")
    ).rejects.toThrow("Invalid or non-existent product reference.");
  });

  it("should throw duplicate order error (P2002)", async () => {
    mockRepository.create.mockRejectedValue({ code: "P2002" });

    await expect(
      service.create({ total: 100 } as any, "user-1")
    ).rejects.toThrow("Duplicate order detected.");
  });

  it("should throw generic error on create", async () => {
    mockRepository.create.mockRejectedValue(new Error("Unknown DB issue"));

    await expect(
      service.create({ total: 100 } as any, "user-1")
    ).rejects.toThrow("Failed to create the order.");
  });

  it("should update an order successfully", async () => {
    const updated = { id: 1, total: 500 };
    mockRepository.update.mockResolvedValue(updated);

    const result = await service.update(1, { total: 500 } as any, "user-1");

    expect(result).toEqual(updated);
    expect(mockRepository.update).toHaveBeenCalledWith(
      1,
      "user-1",
      expect.anything()
    );
  });

  it("should throw Prisma error P2025 on update", async () => {
    mockRepository.update.mockRejectedValue({ code: "P2025" });

    await expect(
      service.update(99, { total: 200 } as any, "user-1")
    ).rejects.toThrow("Order not found for update.");
  });

  it("should throw generic error on update", async () => {
    mockRepository.update.mockRejectedValue(new Error("DB failed"));

    await expect(
      service.update(99, { total: 200 } as any, "user-1")
    ).rejects.toThrow("Failed to update the order.");
  });

  it("should delete an order successfully", async () => {
    mockRepository.delete.mockResolvedValue(true);
    await expect(service.delete(1, "user-1")).resolves.not.toThrow();
    expect(mockRepository.delete).toHaveBeenCalledWith(1, "user-1");
  });

  it("should throw Prisma error P2025 on delete", async () => {
    mockRepository.delete.mockRejectedValue({ code: "P2025" });

    await expect(service.delete(1, "user-1")).rejects.toThrow(
      "Order not found for deletion."
    );
  });

  it("should throw generic error on delete", async () => {
    mockRepository.delete.mockRejectedValue(new Error("DB fail"));

    await expect(service.delete(1, "user-1")).rejects.toThrow(
      "Failed to delete the order."
    );
  });
});
