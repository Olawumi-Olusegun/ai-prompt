import { getUser } from "@/actions/user/getUser";
import PromptDetailsPage from "./_page";
import { getPromptById } from "@/actions/prompts/getPromptById";
import { getPromptByCategory } from "@/actions/prompts/getPromptsByCategory";
import { stripePublishableKey } from "@/actions/prompts/payment/paymentAction";

const PromptDetail = async ({
  params: { promptId },
}: {
  params: { promptId: string };
}) => {
  const data = await getUser();
  const promptData = await getPromptById(promptId);
  const relatedPromptData = await getPromptByCategory(
    promptData?.category ?? ""
  );

  const publishableKey = await stripePublishableKey();

  const relatedPrompt =
    relatedPromptData &&
    relatedPromptData.filter((prompt: any) => prompt.id !== promptData.id);

  return (
    <div>
      <PromptDetailsPage
        data={data}
        promptData={promptData}
        relatedPrompt={relatedPrompt}
        publishableKey={publishableKey}
      />
    </div>
  );
};

export default PromptDetail;
