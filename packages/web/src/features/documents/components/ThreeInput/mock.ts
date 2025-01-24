import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";

import { ThreeInputItem } from "@sparcs-students/web/features/documents/components/ThreeInput/index";

export const mockData: ThreeInputItem[] = [
  {
    id: 0,
    label: "2022년도",
    year: 2022,
    value: {
      isSpring: true,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.FinancialStatementProposal,
          DocumentType.BusinessPlan,
          DocumentType.BusinessReport,
        ],
        selectedType: DocumentType.BudgetProposal,
        organization: [
          {
            key: { label: "개발자1", value: "개발자1" },
            values: [
              { label: "chacha", value: "chacha" },
              { label: "eel", value: "eel" },
              { label: "malloc", value: "malloc" },
              { label: "casio", value: "casio" },
              { label: "gb", value: "gb" },
              { label: "mingle", value: "mingle" },
            ],
          },
          {
            key: { label: "디자이너1", value: "디자이너1" },
            values: [
              { label: "somato", value: "somato" },
              { label: "dudu", value: "dudu" },
              { label: "siwon", value: "siwon" },
            ],
          },
        ],
      },
    },
  },
  {
    id: 1,
    label: "2022년도",
    year: 2022,
    value: {
      isSpring: true,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.FinancialStatementProposal,
          DocumentType.BusinessPlan,
          DocumentType.BusinessReport,
        ],
        selectedType: DocumentType.BusinessPlan,
        organization: [
          {
            key: { label: "개발자2", value: "개발자2" },
            values: [
              { label: "chacha", value: "chacha" },
              { label: "eel", value: "eel" },
              { label: "malloc", value: "malloc" },
              { label: "casio", value: "casio" },
              { label: "gb", value: "gb" },
              { label: "mingle", value: "mingle" },
            ],
          },
          {
            key: { label: "디자이너2", value: "디자이너2" },
            values: [
              { label: "somato", value: "somato" },
              { label: "dudu", value: "dudu" },
              { label: "siwon", value: "siwon" },
            ],
          },
        ],
      },
    },
  },
  {
    id: 2,
    label: "2022년도",
    year: 2022,
    value: {
      isSpring: false,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.FinancialStatementProposal,
          DocumentType.BusinessPlan,
          DocumentType.BusinessReport,
        ],
        selectedType: DocumentType.BusinessPlan,
        organization: [
          {
            key: { label: "개발자3", value: "개발자3" },
            values: [
              { label: "chacha", value: "chacha" },
              { label: "eel", value: "eel" },
              { label: "malloc", value: "malloc" },
              { label: "casio", value: "casio" },
              { label: "gb", value: "gb" },
              { label: "mingle", value: "mingle" },
            ],
          },
          {
            key: { label: "디자이너3", value: "디자이너3" },
            values: [
              { label: "somato", value: "somato" },
              { label: "dudu", value: "dudu" },
              { label: "siwon", value: "siwon" },
            ],
          },
        ],
      },
    },
  },
  {
    id: 3,
    label: "2022년도",
    year: 2022,
    value: {
      isSpring: false,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.FinancialStatementProposal,
          DocumentType.BusinessPlan,
          DocumentType.BusinessReport,
        ],
        selectedType: DocumentType.BusinessReport,
        organization: [
          {
            key: { label: "개발자4", value: "개발자4" },
            values: [
              { label: "chacha", value: "chacha" },
              { label: "eel", value: "eel" },
              { label: "malloc", value: "malloc" },
              { label: "casio", value: "casio" },
              { label: "gb", value: "gb" },
              { label: "mingle", value: "mingle" },
            ],
          },
          {
            key: { label: "디자이너4", value: "디자이너4" },
            values: [
              { label: "somato", value: "somato" },
              { label: "dudu", value: "dudu" },
              { label: "siwon", value: "siwon" },
            ],
          },
        ],
      },
    },
  },
  {
    id: 4,
    label: "2023년도",
    year: 2023,
    value: {
      isSpring: true,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.FinancialStatementProposal,
          DocumentType.BusinessPlan,
          DocumentType.BusinessReport,
        ],
        selectedType: DocumentType.FinancialStatementProposal,
        organization: [
          {
            key: { label: "개발자5", value: "개발자5" },
            values: [
              { label: "chacha", value: "chacha" },
              { label: "eel", value: "eel" },
              { label: "malloc", value: "malloc" },
              { label: "casio", value: "casio" },
              { label: "gb", value: "gb" },
              { label: "mingle", value: "mingle" },
            ],
          },
          {
            key: { label: "디자이너5", value: "디자이너5" },
            values: [
              { label: "somato", value: "somato" },
              { label: "dudu", value: "dudu" },
              { label: "siwon", value: "siwon" },
            ],
          },
        ],
      },
    },
  },
  {
    id: 5,
    label: "2023년도",
    year: 2023,
    value: {
      isSpring: true,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.FinancialStatementProposal,
          DocumentType.BusinessPlan,
          DocumentType.BusinessReport,
        ],
        selectedType: DocumentType.BusinessPlan,
        organization: [
          {
            key: { label: "개발자6", value: "개발자6" },
            values: [
              { label: "chacha", value: "chacha" },
              { label: "eel", value: "eel" },
              { label: "malloc", value: "malloc" },
              { label: "casio", value: "casio" },
              { label: "gb", value: "gb" },
              { label: "mingle", value: "mingle" },
            ],
          },
          {
            key: { label: "디자이너6", value: "디자이너6" },
            values: [
              { label: "somato", value: "somato" },
              { label: "dudu", value: "dudu" },
              { label: "siwon", value: "siwon" },
            ],
          },
        ],
      },
    },
  },
  {
    id: 6,
    label: "2023년도",
    year: 2023,
    value: {
      isSpring: false,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.FinancialStatementProposal,
          DocumentType.BusinessPlan,
          DocumentType.BusinessReport,
        ],
        selectedType: DocumentType.BusinessPlan,
        organization: [
          {
            key: { label: "개발자7", value: "개발자7" },
            values: [
              { label: "chacha", value: "chacha" },
              { label: "eel", value: "eel" },
              { label: "malloc", value: "malloc" },
              { label: "casio", value: "casio" },
              { label: "gb", value: "gb" },
              { label: "mingle", value: "mingle" },
            ],
          },
          {
            key: { label: "디자이너7", value: "디자이너7" },
            values: [
              { label: "somato", value: "somato" },
              { label: "dudu", value: "dudu" },
              { label: "siwon", value: "siwon" },
            ],
          },
        ],
      },
    },
  },
  {
    id: 7,
    label: "2023년도",
    year: 2023,
    value: {
      isSpring: false,
      documentType: {
        types: [
          DocumentType.BudgetProposal,
          DocumentType.FinancialStatementProposal,
          DocumentType.BusinessPlan,
          DocumentType.BusinessReport,
        ],
        selectedType: DocumentType.BusinessReport,
        organization: [
          {
            key: { label: "개발자8", value: "개발자8" },
            values: [
              { label: "chacha", value: "chacha" },
              { label: "eel", value: "eel" },
              { label: "malloc", value: "malloc" },
              { label: "casio", value: "casio" },
              { label: "gb", value: "gb" },
              { label: "mingle", value: "mingle" },
            ],
          },
          {
            key: { label: "디자이너8", value: "디자이너8" },
            values: [
              { label: "somato", value: "somato" },
              { label: "dudu", value: "dudu" },
              { label: "siwon", value: "siwon" },
            ],
          },
        ],
      },
    },
  },
];
