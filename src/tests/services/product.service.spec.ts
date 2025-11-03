import { ProductService } from "../../services/product.service";

describe("ProductService", () => {
  let mockRepository: any;
  let service: ProductService;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new ProductService(mockRepository);
  });

  it("should return a list of products", async () => {
    const mockData = [{ id: 1, name: "Protein Supplement" }];
    mockRepository.findAll.mockResolvedValue(mockData);

    const result = await service.getAll("user-1");

    expect(result[0]).toEqual(expect.objectContaining(mockData[0]));
    expect(mockRepository.findAll).toHaveBeenCalledWith("user-1");
  });

  it("should throw an error if findAll fails", async () => {
    mockRepository.findAll.mockRejectedValue(new Error("DB error"));
    await expect(service.getAll("user-1")).rejects.toThrow(
      "Failed to load products."
    );
  });

  it("should return a product by id", async () => {
    const mockProduct = { id: 1, name: "Total Corte Premium" };
    mockRepository.findById.mockResolvedValue(mockProduct);

    const result = await service.getById(1, "user-1");

    expect(result).toEqual(expect.objectContaining(mockProduct));
    expect(mockRepository.findById).toHaveBeenCalledWith(1, "user-1");
  });

  it("should throw if product not found", async () => {
    mockRepository.findById.mockResolvedValue(null);
    await expect(service.getById(99, "user-1")).rejects.toThrow(
      "Failed to fetch the product."
    );
  });

  it("should create a product successfully", async () => {
    const dto = { name: "Total Ureia Premium" };
    const created = { id: 10, name: "Total Ureia Premium" };
    mockRepository.create.mockResolvedValue(created);

    const result = await service.create(dto as any, "user-1");

    expect(result).toEqual(expect.objectContaining(created));
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it("should throw duplicate product error (P2002)", async () => {
    mockRepository.create.mockRejectedValue({ code: "P2002" });

    await expect(
      service.create({ name: "Duplicated" } as any, "user-1")
    ).rejects.toThrow("Duplicate product detected.");
  });

  it("should throw generic error on create", async () => {
    mockRepository.create.mockRejectedValue(new Error("Unknown DB issue"));

    await expect(
      service.create({ name: "Fail Product" } as any, "user-1")
    ).rejects.toThrow("Failed to create the product.");
  });

  it("should update a product successfully", async () => {
    const updated = { id: 1, name: "Updated Product" };
    mockRepository.update.mockResolvedValue(updated);

    const result = await service.update(1, "user-1", {
      name: "Updated Product",
    } as any);

    expect(result).toEqual(expect.objectContaining(updated));
    expect(mockRepository.update).toHaveBeenCalledWith(
      1,
      "user-1",
      expect.anything()
    );
  });

  it("should throw generic error if product not found for update (null result)", async () => {
    mockRepository.update.mockResolvedValue(null);

    await expect(
      service.update(99, "user-1", { name: "Nonexistent" } as any)
    ).rejects.toThrow("Failed to update the product.");
  });

  it("should throw Prisma error P2025 on update", async () => {
    mockRepository.update.mockRejectedValue({ code: "P2025" });

    await expect(
      service.update(99, "user-1", { name: "Fail" } as any)
    ).rejects.toThrow("Product not found for update.");
  });

  it("should throw generic error on update", async () => {
    mockRepository.update.mockRejectedValue(new Error("DB fail"));

    await expect(
      service.update(1, "user-1", { name: "Err" } as any)
    ).rejects.toThrow("Failed to update the product.");
  });

  it("should delete product successfully", async () => {
    mockRepository.delete.mockResolvedValue(true);
    await expect(service.delete(1, "user-1")).resolves.not.toThrow();
    expect(mockRepository.delete).toHaveBeenCalledWith(1, "user-1");
  });

  it("should throw Prisma error P2025 on delete", async () => {
    mockRepository.delete.mockRejectedValue({ code: "P2025" });

    await expect(service.delete(1, "user-1")).rejects.toThrow(
      "Product not found for deletion."
    );
  });

  it("should throw generic error on delete", async () => {
    mockRepository.delete.mockRejectedValue(new Error("DB fail"));

    await expect(service.delete(1, "user-1")).rejects.toThrow(
      "Failed to delete the product."
    );
  });
});
