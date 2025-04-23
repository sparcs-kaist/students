import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";

import { ThreeInputItem } from "@sparcs-students/web/features/document-lookup/components/ThreeInput/index";

export const mockData: ThreeInputItem[] = [
  {
    id: 0,
    label: "2024년도",
    year: 2024,
    value: {
      isSpring: true,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.BudgetReport,
          DocumentType.ProjectProposal,
          DocumentType.ProjectReport,
        ],
        selectedType: DocumentType.BudgetProposal,
        organization: [
          {
            key: { label: "어떤 집단 1", value: "어떤 집단 1" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 0 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 1 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 2 },
            ],
          },
          {
            key: { label: "어떤 집단 2", value: "어떤 집단 2" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 3 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 4 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 5 },
            ],
          },
        ],
      },
    },
  },
  {
    id: 1,
    label: "2024년도",
    year: 2024,
    value: {
      isSpring: true,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.BudgetReport,
          DocumentType.ProjectProposal,
          DocumentType.ProjectReport,
        ],
        selectedType: DocumentType.ProjectProposal,
        organization: [
          {
            key: { label: "어떤 집단 3", value: "어떤 집단 3" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 6 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 7 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 8 },
            ],
          },
          {
            key: { label: "어떤 집단 4", value: "어떤 집단 4" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 9 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 10 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 11 },
            ],
          },
        ],
      },
    },
  },
  {
    id: 2,
    label: "2024년도",
    year: 2024,
    value: {
      isSpring: false,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.BudgetReport,
          DocumentType.ProjectProposal,
          DocumentType.ProjectReport,
        ],
        selectedType: DocumentType.ProjectProposal,
        organization: [
          {
            key: { label: "어떤 집단 5", value: "어떤 집단 5" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 12 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 13 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 14 },
            ],
          },
          {
            key: { label: "어떤 집단 6", value: "어떤 집단 6" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 15 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 16 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 17 },
            ],
          },
        ],
      },
    },
  },
  {
    id: 3,
    label: "2024년도",
    year: 2024,
    value: {
      isSpring: false,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.BudgetReport,
          DocumentType.ProjectProposal,
          DocumentType.ProjectReport,
        ],
        selectedType: DocumentType.ProjectReport,
        organization: [
          {
            key: { label: "어떤 집단 7", value: "어떤 집단 7" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 18 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 19 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 20 },
            ],
          },
          {
            key: { label: "어떤 집단 8", value: "어떤 집단 8" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 21 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 22 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 23 },
            ],
          },
        ],
      },
    },
  },
  {
    id: 4,
    label: "2025년도",
    year: 2025,
    value: {
      isSpring: true,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.BudgetReport,
          DocumentType.ProjectProposal,
          DocumentType.ProjectReport,
        ],
        selectedType: DocumentType.BudgetProposal,
        organization: [
          {
            key: { label: "어떤 집단 9", value: "어떤 집단 9" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 24 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 25 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 26 },
            ],
          },
          {
            key: { label: "어떤 집단 10", value: "어떤 집단 10" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 27 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 28 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 29 },
            ],
          },
        ],
      },
    },
  },
  {
    id: 5,
    label: "2025년도",
    year: 2025,
    value: {
      isSpring: true,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.BudgetReport,
          DocumentType.ProjectProposal,
          DocumentType.ProjectReport,
        ],
        selectedType: DocumentType.BudgetReport,
        organization: [
          {
            key: { label: "어떤 집단 11", value: "어떤 집단 11" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 30 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 31 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 32 },
            ],
          },
          {
            key: { label: "어떤 집단 12", value: "어떤 집단 12" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 33 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 34 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 35 },
            ],
          },
        ],
      },
    },
  },
  {
    id: 6,
    label: "2025년도",
    year: 2025,
    value: {
      isSpring: false,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.BudgetReport,
          DocumentType.ProjectProposal,
          DocumentType.ProjectReport,
        ],
        selectedType: DocumentType.ProjectProposal,
        organization: [
          {
            key: { label: "어떤 집단 13", value: "어떤 집단 13" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 36 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 37 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 38 },
            ],
          },
          {
            key: { label: "어떤 집단 14", value: "어떤 집단 14" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 39 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 40 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 41 },
            ],
          },
        ],
      },
    },
  },
  {
    id: 7,
    label: "2025년도",
    year: 2025,
    value: {
      isSpring: false,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.BudgetReport,
          DocumentType.ProjectProposal,
          DocumentType.ProjectReport,
        ],
        selectedType: DocumentType.ProjectReport,
        organization: [
          {
            key: { label: "어떤 집단 15", value: "어떤 집단 15" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 42 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 43 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 44 },
            ],
          },
          {
            key: { label: "어떤 집단 16", value: "어떤 집단 16" },
            values: [
              { label: "어떤 단체 1", value: "어떤 단체 1", id: 45 },
              { label: "어떤 단체 2", value: "어떤 단체 2", id: 46 },
              { label: "어떤 단체 3", value: "어떤 단체 3", id: 47 },
            ],
          },
        ],
      },
    },
  },
];
