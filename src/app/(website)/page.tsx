import PageProvider from '@/components/website/pages/page-provider';

export default function Home() {
  return (
    <main className="w-full">
      <PageProvider title="ABOUT ME">
        {/* About Summary */}
        <div className="mb-3">
          <p className="para-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            non ea vitae a. Ullam reiciendis, voluptatibus amet aliquam
            voluptatem a quos nihil provident porro similique architecto libero
            dolorum non soluta. Accusamus magnam ipsa aliquid laboriosam ad
            culpa reiciendis, magni, aspernatur odit eaque, veniam cupiditate
            nam reprehenderit eveniet dolorem modi nisi tenetur necessitatibus
            quia vitae veritatis. Eaque nemo veniam eveniet rem! Facere quos
            molestiae, neque aliquam
          </p>
        </div>

        {/* What I do! */}
        <div>
          <h2 className="mb-1.5">What I do!</h2>
          <div></div>
        </div>
      </PageProvider>
    </main>
  );
}
