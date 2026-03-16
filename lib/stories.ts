export interface Story {
  id: number
  slug: string
  heroImage?: string
  age: string
  gender: string
  address: string
  graveLocation: string
  destination: string
  cemeteryType: string
  templeName: string
  reasons: string[]
  triggerEpisode: string
  familyDiscussion: string
  templeReaction: string
  ridanFee: string
  ofuse: string
  stoneShopCost: string
  estimateCount: string
  paperwork: string
  duration: string
  destinationType: string
  destinationCost: string
  hardestPart: string
  goodPoints: string
  ifRedoAgain: string
}

export const stories: Story[] = [
  {
    id: 1,
    slug: "story-01",
    heroImage: "/placeholder.svg?height=400&width=1200",
    age: "50代",
    gender: "男性",
    address: "東京都",
    graveLocation: "富山県",
    destination: "東京都",
    cemeteryType: "公営霊園",
    templeName: "富山霊園",
    reasons: ["遠方", "子供世代に負担をかけたくない"],
    triggerEpisode: "きっかけは、毎年のお盆や法事の際に、富山の実家にあるお墓の手入れをしていた時です。年々、周りの雑草が増えてきて、墓石にも小さなひび割れが目立つようになってきました。私は現在東京で生活しており、富山まで数時間かけて行くのは、年々体力的にも時間的にも負担が大きくなってきました。自分が元気なうちはまだ良いのですが、将来、足腰が弱くなった時や、子供たちにこの負担を引き継がせるわけにはいかないと思い、墓じまいを決意しました。",
    familyDiscussion: "親族の中には墓じまいに慎重な意見を持つ人もいました。特に母の兄である叔父は、先祖代々受け継いできた土地やお墓を守るべきだという伝統的な考えを持っており、最初は強く反対されました。私は感情的に反論するのではなく、将来的にかかる維持管理費の具体的な試算や、更地にするための高額な費用、また、このままだと無縁仏になるリスクがあることを丁寧に説明しました。何度も電話や直接会って話し合いを重ねた結果、最終的には私の負担を理解してもらい、納得してもらいました。",
    templeReaction: "連絡した際、最初、少し驚いた様子で沈黙がありましたが、非常に冷静に対応してくださりました。電話越しに聞こえる声からは、長年のお付き合いがあった檀家が離れることへの寂しさが伝わってきましたが、時代の流れであり、管理ができなくなるのが一番辛いことだろうと、自分たちの状況に理解を示してくださったのが印象的でした。最終的には離檀の手続きについても丁寧に説明していただき、わだかまりを残すことなくお話を終えることができ、心がとても軽くなりました。",
    ridanFee: "20〜30万円",
    ofuse: "10〜20万円",
    stoneShopCost: "30〜50万円",
    estimateCount: "2社",
    paperwork: "自分",
    duration: "3〜6ヶ月",
    destinationType: "永代供養墓",
    destinationCost: "30〜50万円",
    hardestPart: "一番大変だったのは、行政手続きと親族間の調整という事務的な作業と感情的な面の両立でした。改葬許可証の申請には、富山の役所と移転先との間で何度も書類をやり取りし、不備があれば修正する必要があり、非常に煩雑でした。精神的には、叔父を説得することが一番の重荷でした。先祖を蔑ろにしているのではないかという自責の念もありましたが、最終的には、供養の形を変えるだけと自分に言い聞かせ、ひとつひとつの壁を乗り越えていく過程で、心身ともに疲れ果てました。",
    goodPoints: "墓じまいを終えて一番良かったのは、長年心の中にあった、お墓をどうしようという大きな不安が完全に解消されたことです。富山という遠方に墓所があることで、日常的に様子を見に行くことが出来ず、お盆や命日が近づくたびに、放置してしまっているという申し訳なさと罪悪感を感じていました。ただ、東京の自宅から通いやすい永代供養墓に移したことで、思い立った時にすぐにお参りに行けるようになり、安心感が生まれました。また、子供たちにも将来的な管理の負担を残さずに済んだことが大きな安堵感となり、家族全員が前向きな気持ちになれたことが、何よりの収穫だと思っています。",
    ifRedoAgain: "もしやり直すなら、石材店への見積もりをもっと早い段階で、複数の業者から詳細に取っておけばよかったと思っています。今回は2社から見積もりを取りましたが、撤去費用の相場感が分からず、交渉に時間がかかってしまいました。また、親族への相談も、決定事項として伝えるのではなく、検討を始めた初期段階から相談という形で巻き込んでおけば、叔父の反発ももう少し和らげられたと思います。"
  }
]

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug)
}

export function getAllStorySlugs(): string[] {
  return stories.map((story) => story.slug)
}
